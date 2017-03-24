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
    request.getAvailability(currentEvent.eventID, userStore.personID).then((response) => {
      currentEvent.availability = response.body.availableTimes
      currentEvent.desiredHours = response.body.desiredHours
      browserHistory.push('/vms/home/event/check-availability')
    })
  }

  _volunteerObjectBuilder() {
    return new Promise((resolve, reject) => {
      var count = 0
      currentEvent.volunteerIDs.map((ID, index) => {
        var availabilityRequest = new Api()
        availabilityRequest.getAvailability(currentEvent.eventID, ID).then((availability) => {
          var jobsRequest = new Api()
          jobsRequest.getPersonJobs(ID, currentEvent.eventID).then((jobs) => {
            count = count + 1
            currentEvent.volunteerObjects[ID]={
              times: availability.body.availableTimes,
              desiredHours: availability.body.desiredHours,
              jobs: jobs.body
            }
            if (count >= currentEvent.volunteerIDs.length) {
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
    var id = setTimeout(function() { alert('Please give us a moment to fetch the information.'); }, 1000);
    this._volunteerObjectBuilder().then(() => {
      console.log(currentEvent.volunteerObjects)
      clearTimeout(id)
      browserHistory.push('/vms/home/event/volunteer-availability')
    }).catch((error) => {
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
    if (userStore.isAdmin){
      request.getEvents().then((response) => {
        eventStore.events = []
        for (var key in response.body) {
          eventStore.events.push({eventID: key, eventName: response.body[key].event_name, eventDates: response.body[key].eventDays})
        }
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
        browserHistory.push('/vms/home')
      })
    }
  }
}
export default EventPortal;
