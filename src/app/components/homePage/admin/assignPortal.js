import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import PeoplePicker from '../shared/peoplePicker';
import currentJob from '../../../event/currentJob';
import currentEvent from '../../../event/currentEvent';

require('./assignPortal.less')
require('../../app.less')

class AssignPortal extends React.Component {

  componentWillMount(){
    this.snackalert = ''
  }
  render() {
    return (
      <section id='assign-portal'>
        <h2>Assign Person to {currentJob.jobName}</h2>
        <PeoplePicker/>
        <div className='confirmation'>
          <div id="assignedVolunteer">{currentJob.volunteerID ? <button onClick={this._handleUnassignClick.bind(this)}>Unassign {currentJob.volunteerName}</button> : null}</div>
          <div id="selection"><button onClick={this._handleAssignClick.bind(this)}>Assign</button>
              <button onClick={this._handleBackClick.bind(this)}>Back to Jobs</button>
          </div>
        </div>
        <div className="snackbar" ref='snackbar'>{this.snackalert}</div>
      </section>
    )
  }

  _changeAlert(value, time){
    this.snackalert = value;
    this.setState(() => {return true;})
    this._showSnackBar(time)
  }

  _showSnackBar(displayTime){
    var t = this.refs.snackbar
      t.classList = "snackbar show";

      return setTimeout(function(){ t.classList = "snackbar"; }, displayTime);
  }

  _handleUnassignClick(event) {
    if (confirm(`Are you sure you want to remove ${currentJob.volunteerName} from ${currentJob.jobName}?`)) {
      var request = new Api()
      request.unassignVolunteer(currentJob.volunteerID, currentEvent.eventID, currentJob.jobID).then((unassignResponse) => {
        this._changeAlert(`Successfullly unassigned ${currentJob.volunteerName} from ${currentJob.jobName}`, 2500)
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
    request.assignVolunteer(currentJob.selectedPerson.ID, currentEvent.eventID, currentJob.jobID).then((response) => {
      currentJob.volunteerName = currentJob.selectedPerson.name
      currentJob.volunteerID = currentJob.selectedPerson.ID
      this._changeAlert(`Successfullly assigned ${currentJob.selectedPerson.name} to ${currentJob.jobName}`, 2500)
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
