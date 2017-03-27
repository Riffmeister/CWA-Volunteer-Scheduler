import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../../shared/header';
import GlobalEvents from './globalEvents';
import EventJobs from '../admin/eventJobs';
import MyJobs from '../volunteer/myJobs';
import NewEvent from '../admin/newEvent';
import userStore from '../../../user/userStore';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import SetAvailability from './setAvailability';

require('./eventPortal.less')

@observer
class EventPortal extends React.Component {

  componentWillMount() {
    currentEvent.volunteerObjects = []
  }

  render() {
    if (userStore.isAdmin) {
    return (
      <section className='event-portal'>
        <h2>{currentEvent.eventName}</h2>
        <div className='event-body'>
          {currentEvent.jobs.length > 0 ? <EventJobs /> : null}
        </div>
        <div className='confirmation'>
          <button onClick={this._handleCreateJob.bind(this)}>Create Job(s)</button>
          <button onClick={this._handleVolunteerAvailability.bind(this)}>Volunteer Availability</button>
          <button onClick={this._handleEventsClick.bind(this)}>Back to All Events</button>
        </div>
    </section>)
  } else {
    return (
      <section className='event-portal'>
        <h2>{currentEvent.eventName}</h2>
        <div className='event-body'>
          <MyJobs />
        </div>
        <div className='confirmation'>
          <button onClick={this._handleAvailabilityClick.bind(this)}>Availability</button>
          <button onClick={this._handleEventsClick.bind(this)}>Back to All Events</button>
        </div>
      </section>
    )
  }
}

  _handleAvailabilityClick(event) {
    event.preventDefault()
    var request = new Api()
    var id = setTimeout(function() { alert('Please give us a moment to get your availability.'); }, 1000);

    request.getAvailability(currentEvent.eventID, userStore.personID).then((response) => {
      currentEvent.availability = response.body.availableTimes
      currentEvent.desiredHours = response.body.desiredHours
      clearTimeout(id)
      browserHistory.push('/vms/home/event/check-availability')
    })
  }

  _volunteerObjectBuilder() {
    return new Promise((resolve, reject) => {
      var count = 0
      Object.keys(currentEvent.volunteers).map((id) => {
        var availabilityRequest = new Api()
        availabilityRequest.getAvailability(currentEvent.eventID, id).then((availability) => {
          var jobsRequest = new Api()
          jobsRequest.getPersonJobs(id, currentEvent.eventID).then((jobs) => {
            count = count + 1
            currentEvent.volunteerObjects[id]={
              times: availability.body.availableTimes,
              name: currentEvent.volunteers[id].first + ' ' + currentEvent.volunteers[id].last,
              desiredHours: availability.body.desiredHours,
              jobs: jobs.body
            }
            if (count >= Object.keys(currentEvent.volunteers).length - 1) {
              resolve()
            }
          }).catch((error) => {
            reject(error)
          })
        }).catch((error) => {
          reject(error)
        })
      })
    })
  }

  _handleVolunteerAvailability(event) {
    event.preventDefault()
    var id = setTimeout(function() { alert('Please give us a moment to get all of your volunteers.'); }, 2000);
    this._volunteerObjectBuilder().then(() => {
      clearTimeout(id)
      browserHistory.push('/vms/home/event/volunteer-availability')
    }).catch((error) => {
      alert('There seems to have been a network error, please try again!')
      clearTimeout(id)
      console.log(error)
    })
  }

  _handleCreateJob(event) {
  	event.preventDefault()
  	browserHistory.push('/vms/home/event/create-new-job')
  }

  _handleEventsClick(event) {
    event.preventDefault()
    var request = new Api()
    var id = setTimeout(function() { alert('Please give us a moment to grab all of the events.'); }, 1000);
    if (userStore.isAdmin){
      request.getEvents().then((response) => {
        eventStore.events = []
        for (var key in response.body) {
          eventStore.events.push({eventID: key, eventName: response.body[key].event_name, eventDates: response.body[key].eventDays})
        }
        clearTimeout(id)
        browserHistory.push('/vms/home')
      }).catch((error) => {
        console.log(error)
      })
    } else {
      request.getPersonEvents(userStore.personID).then((response) => {
        response.body.eventId.map((event) => {
          if (!userStore.events.includes(`${event}`)) {
            userStore.events.push(`${event}`)
          }
        })
        clearTimeout(id)
        browserHistory.push('/vms/home')
      })
    }
  }
}
export default EventPortal;
