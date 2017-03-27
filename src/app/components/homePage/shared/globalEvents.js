import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import currentEvent from '../../../event/currentEvent';
import eventStore from '../../../event/eventStore';
import React from 'react';
import ReactDOM from 'react-dom';
import SetAvailability from './setAvailability';
import userStore from '../../../user/userStore';

@observer
class GlobalEvents extends React.Component {

  componentWillMount() {
    currentEvent.availability = {}
    currentEvent.eventName = ''
    currentEvent.eventID = ''
    currentEvent.dates = []
    currentEvent.selectedDates = []
    currentEvent.jobs = []
    currentEvent.desiredHours = null
    currentEvent.volunteers = {}
  }

  render() {
    let eventElements = []
    eventStore.events.map((event) => {
      return (
        eventElements.push(
          <div key={event.eventID}>
            <button onClick={this._handleEventClick.bind(this, event)}>
              {event.eventName}
            </button>
          </div>
        )
      )
    })

      return (
         <section className='events'>
            <h2>Events</h2>
            <div className='events-body'>
              {eventElements}
            </div>
         </section>
      )
  }

  _handleEventClick(eventData, event) {
    currentEvent.eventName = eventData.eventName
    currentEvent.eventID = eventData.eventID
    currentEvent.dates = eventData.eventDates
    eventData.eventDates.map((date) => {
      currentEvent.availability[date] = []
    })
    var request = new Api()
    var id = setTimeout(function() { alert('Please give us a moment to load up your event.'); }, 1000);
    if (userStore.isAdmin) {
      request.getEvent(eventData.eventID).then((response) => {
        currentEvent.jobs = []
        currentEvent.volunteers = response.body.volunteers
        for (var key in response.body.jobs) {
          currentEvent.jobs.push({
            jobID: key,
            jobName: response.body.jobs[key].job_name,
            jobDescription: response.body.jobs[key].job_description,
            jobLocation: response.body.jobs[key].location,
            jobDate: response.body.jobs[key].job_date,
            jobStatus: response.body.jobs[key].job_status,
            jobTime: response.body.jobs[key].job_time_start + '-' + response.body.jobs[key].job_time_end,
            volunteerID: response.body.jobs[key].volunteer_id,
            volunteerFirstName: response.body.jobs[key].volunteer_id ? response.body.volunteers[response.body.jobs[key].volunteer_id].first : null,
            volunteerLastName: response.body.jobs[key].volunteer_id ? response.body.volunteers[response.body.jobs[key].volunteer_id].last : null
          })
        }
        clearTimeout(id)
        browserHistory.push("/vms2/home/event")
      })
    } else {
      if (userStore.events.includes(eventData.eventID)) {
        request.getPersonJobs(userStore.personID, currentEvent.eventID).then((response) => {
          currentEvent.jobs = []
          for (var key in response.body) {
            currentEvent.jobs.push({
              jobID: key,
              jobName: response.body[key].job_name,
              jobDescription: response.body[key].job_description,
              jobLocation: response.body[key].location,
              jobDate: response.body[key].job_date,
              jobStatus: response.body[key].job_status,
              jobTime: response.body[key].job_time_start + '-' + response.body[key].job_time_end
            })
          }
          clearTimeout(id)
          browserHistory.push("/vms2/home/event")
        })
      } else {
        browserHistory.push("/vms2/home/event/set-availability")
      }
    }
  }

  _handleRefresh(event) {
    event.preventDefault()
    var eventRequest = new Api()
    eventRequest.getEvents().then((response) => {
      for (var key in response.body) {
        eventStore.events.push({eventID: key, eventName: response.body[key].event_name, startDate: response.body[key].start_date, endDate: response.body[key].end_date})
      }
    }).catch((error) => {
      console.log(error)
    })
    console.log('success')
  }
}
export default GlobalEvents;
