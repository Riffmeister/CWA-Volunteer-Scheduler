import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import PeoplePicker from '../shared/peoplePicker';
import currentJob from '../../../event/currentJob';
import currentEvent from '../../../event/currentEvent';
import userStore from '../../../user/userStore';

require('./assignPortal.less')

@observer
class ForceAssignPortal extends React.Component {
  render() {
    return (
      <section id='assign-portal'>
        <h2>Force Assign</h2>
        <div className='jobs'>
          {this._generateJobElements()}
        </div>
        <div className='confirmation'>
          <button onClick={this._handleAssignClick.bind(this)}>Assign</button>
          <button onClick={this._handleBackClick.bind(this)}>Back to Volunteers</button>
        </div>
      </section>
    )
  }

  _generateJobElements() {
    var jobElements = currentEvent.jobs.map((job) => {
      return (
        <div key={job['jobID']} className='job'>
          <button ref={job['jobID']}
          onClick={this._handleJobClick.bind(this, job)}>
          <h3>{job['jobName']}</h3>
          <h4>Date: {job['jobDate']}</h4>
          <h4>Time: {job['jobTime']}</h4>
          <h4>Current Volunteer: {job['volunteerID'] ? job['volunteerFirstName'] + ' ' + job['volunteerLastName'] : 'Nobody Assigned'}</h4>
          </button>
        </div>
      )
    })
    return jobElements
  }

  _handleJobClick(job, event) {
    event.preventDefault()
    if (currentEvent.selectedJob && (currentEvent.selectedJob['jobID'] === job['jobID'])) {
      this.refs[job['jobID']].classList = ''
      currentEvent.selectedJob = null
    } else if (currentEvent.selectedJob) {
      this.refs[currentEvent.selectedJob['jobID']].classList = ''
      currentEvent.selectedJob = job
      this.refs[job['jobID']].classList = 'selected'
    } else {
      this.refs[job['jobID']].classList = 'selected'
      currentEvent.selectedJob = job
    }
  }

  _handleAssignClick(event) {
    var request = new Api()
    request.forceAssignVolunteer(currentEvent.forceAssignVolunteer['personID'], currentEvent.eventID, currentEvent.selectedJob['jobID']).then((response) => {
      var eventRequest = new Api()
      eventRequest.getEvent(currentEvent.eventID).then((response) => {
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
        this.setState(() => {true})
        alert(`Successfullly assigned ${userStore.firstName + ' ' + userStore.lastName} to ${currentEvent.selectedJob['jobName']}`)
      })
    })
  }

  _handleBackClick(event) {
    event.preventDefault()
    var request = new Api()
    request.getEvent(currentEvent.eventID).then((response) => {
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
      browserHistory.goBack()
    })
  }
}

export default ForceAssignPortal;
