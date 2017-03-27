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
import currentJob from '../../../event/currentJob';
import SetAvailability from './setAvailability';

require('./jobPortal.less')

@observer
class JobPortal extends React.Component {
  componentWillMount() {
    currentJob.formattedDate = this._formattedJobDate()
  }

  render() {
    return (
      <section className='job-portal'>
        <h2>{currentJob.jobName}</h2>
        <div className='job-body'>
        <div className='job-section'>
          <div className='job-outer-data'>
            <h4>Date:</h4>
            <div className='job-inner-data'>
              <h4>{currentJob.formattedDate.weekDay}:{currentJob.formattedDate.formattedDate}</h4>
            </div>
          </div>
          <div className='job-outer-data'>
            <h4>Job Time:</h4>
            <div className='job-inner-data'>
              <h4>{this._readableTime(currentJob.jobTime)}</h4>
            </div>
          </div>
          <div className='job-outer-data'>
            <h4>Location:</h4>
            <div className='job-inner-data'>
              <h4>{currentJob.jobLocation}</h4>
            </div>
          </div>
        </div>
        <div className='job-section section2'>
          <div className='job-outer-data'>
            <h4>Description:</h4>
            <div className='job-inner-data'>
              <p>{currentJob.jobDescription}</p>
            </div>
          </div>
          <div className='job-outer-data'>
            <h4>Job Status:</h4>
            <div className='job-inner-data'>
              <h4>{currentJob.jobStatus ? currentJob.jobStatus : 'No Job Status'}</h4>
            </div>
          </div>
          {userStore.isAdmin ? (<div className='job-outer-data'>
            <h4>Assigned Volunteer:</h4>
            <div className='job-inner-data'>
              <h4>{currentJob.volunteerID === null ? 'Nobody Assigned' : currentJob.volunteerName}</h4>
            </div>
          </div>) : null}
        </div>
        </div>
        <div className='navigation'>
        {userStore.isAdmin ?
          (<button onClick={this._handleAssignClick.bind(this)}>
        Assign Volunteer
        </button>) :
        <button onClick={this._handleConfirmJobClick.bind(this)}>
        Confirm Job
        </button>}
          <button onClick={this._handleBackClick.bind(this)}>
            Back
          </button>
        </div>
    </section>)
}

_formattedJobDate() {
  var unformattedDate = currentJob.jobDate
  var weekDay = {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday'}
  var year = unformattedDate.substring(0, 4)
  var month = unformattedDate.substring(5, 7)
  var day = unformattedDate.substring(8, 10)
  var dateString = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  var reDate = month + '-' + day + '-' + year

  return ({weekDay: weekDay[dateString.getDay()], formattedDate: reDate})
}

_readableTime(time) {
  var startHour = parseInt(time.substring(0, 2))
  var startMinute = time.substring(3, 5)
  var endHour = parseInt(time.substring(6, 8))
  var endMinute = time.substring(9, 11)
  var startDayTime = ''
  var endDayTime = ''

  if (startHour === 0 || startHour < 12) {
    if (startHour < 10 && startHour !== 0) {
      startHour = '0' + startHour
    }
    startDayTime = 'AM'
  } else {
    if (startHour !== 12) {
    startHour = startHour - 12
    }
    if (startHour < 10) {
      startHour = '0' + startHour
    }
    startDayTime = 'PM'
  }

  if (endHour === 0 || endHour < 12) {
    if (endHour < 10 && endHour !== 0) {
      endHour = '0' + endHour
    }
    endDayTime = 'AM'
  } else {
    if (endHour !== 12){
    endHour = endHour - 12
    }
    if (endHour < 10) {
      endHour = '0' + endHour
    }
    endDayTime = 'PM'
  }
  return (startHour + ':' + startMinute + ' ' + startDayTime + ' - ' + endHour + ':' + endMinute + ' ' + endDayTime)
}

_handleAssignClick(event) {
  event.preventDefault()
  var request = new Api()
  request.getVolunteersAvailabile(currentJob.jobID).then((response) => {
    currentJob.volunteersAvailable = response.body
    browserHistory.push("/vms/home/event/job/assign")
  })
}

_handleConfirmJobClick(event) {
  event.preventDefault()
  var request = new Api()
  request.confirmJob(currentEvent.eventID, currentJob.jobID).then((response) => {
    currentJob.jobStatus = response.body.job_status
    alert(`Job Status Changed to ${currentJob.jobStatus === null ? 'Unconfirmed' : 'Confirmed'}`)
    this.setState(() => {return true})
  })
}

_handleBackClick(event) {
  event.preventDefault()
  var request = new Api()
  if (userStore.isAdmin) {
    request.getEvent(currentEvent.eventID).then((response) => {
      currentEvent.jobs = []
      currentEvent.volunteerIDs = response.body.volunteers
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
      browserHistory.push("/vms/home/event")
    })
  } else {
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
      browserHistory.push("/vms/home/event")
    })
  }
}

}
export default JobPortal;
