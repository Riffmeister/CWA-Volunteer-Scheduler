import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import PeoplePicker from '../shared/peoplePicker';
import currentJob from '../../../event/currentJob';
import currentEvent from '../../../event/currentEvent';

require('./assignPortal.less')

class AssignPortal extends React.Component {
  render() {
    return (
      <section id='assign-portal'>
        <h2>Force Assign</h2>
        <div className='confirmation'>
        <button onClick={this._handleAssignClick.bind(this)}>Assign</button>
          <button onClick={this._handleBackClick.bind(this)}>Back to Job</button>
        </div>
      </section>
    )
  }

  // {this._generateJobElements()}
  _generateJobElements() {
console.log('hello')
  }

  _handleUnassignClick(event) {
    if (confirm(`Are you sure you want to remove ${currentJob.volunteerName} from ${currentJob.jobName}?`)) {
      var request = new Api()
      request.unassignVolunteer(currentJob.volunteerID, currentEvent.eventID, currentJob.jobID).then((unassignResponse) => {
        alert(`Successfullly unassigned ${currentJob.volunteerName} from ${currentJob.jobName}`)
        var availableVolunteersRequest = new Api()
        availableVolunteersRequest.getVolunteersAvailabile(currentJob.jobID).then((availableVolunteersResponse) => {
          currentJob.volunteersAvailable = availableVolunteersResponse.body
          currentJob.volunteerID = ''
          currentJob.volunteerName = ''
          this.setState(() => {true})
        })
      })
    }
  }

  _handleAssignClick(event) {
    var request = new Api()
    request.assignVolunteer(this.props.personID, currentEvent.eventID, currentJob.jobID).then((response) => {
      currentJob.volunteerName = currentJob.selectedPerson.name
      currentJob.volunteerID = currentJob.selectedPerson.ID
      this.setState(() => {true})
      alert(`Successfullly assigned ${currentJob.selectedPerson.name} to ${currentJob.jobName}`)
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

export default AssignPortal;
