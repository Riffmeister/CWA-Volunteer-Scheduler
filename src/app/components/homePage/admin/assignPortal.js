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
        <h2>Assign Person to {currentJob.jobName}</h2>
        <PeoplePicker/>
        <div className='confirmation'>
        {currentJob.volunteerID ? <button onClick={this._handleUnassignClick.bind(this)}>Unassign {currentJob.volunteerName}</button> : null}
        <button onClick={this._handleAssignClick.bind(this)}>Assign</button>
          <button onClick={this._handleBackClick.bind(this)}>Back to Job</button>
        </div>
      </section>
    )
  }

  _handleUnassignClick(event) {
    if (confirm(`Are you sure you want to remove ${currentJob.volunteerName} from ${currentJob.jobName}?`)) {
      var request = new Api()
      request.assignVolunteer(currentJob.volunteerID, currentEvent.eventID, currentJob.jobID).then((response) => {
        alert(`Successfullly unassigned ${currentJob.volunteerName} to ${currentJob.jobName}`)
        console.log(response)
      })
    }
  }

  _handleAssignClick(event) {
    var request = new Api()
    request.assignVolunteer(currentJob.selectedPerson.ID, currentEvent.eventID, currentJob.jobID).then((response) => {
      currentJob.volunteerName = currentJob.selectedPerson.name
      currentJob.volunteerID = currentJob.selectedPerson.ID
      alert(`Successfullly assigned ${currentJob.selectedPerson.name} to ${currentJob.jobName}`)
      console.log(response)
    })
  }

  _handleBackClick(event) {
    event.preventDefault()
    browserHistory.goBack()
  }
}

export default AssignPortal;
