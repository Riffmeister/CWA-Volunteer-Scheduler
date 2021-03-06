import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import React from 'react';
import Availability from '../shared/availability';
import currentEvent from '../../../event/currentEvent';

require('./allAvailability.less')

@observer
class AllAvailability extends React.Component {

  render() {
    return (
      <section id='all-availability'>
      <div className='header'>
        <h2>Volunteers</h2>
        <button onClick={this._handleBackClick.bind(this)}>Back</button>
      </div>
        <div className='volunteer-body'>
          {this._generateAvailabilityElements()}
        </div>
      </section>
    )
  }

  _generateAvailabilityElements() {
    var count = 0
    var availabilityElements = []
    for (var key in currentEvent.volunteerObjects) {
      availabilityElements.push(
        <div className='volunteer' key={key}>
        <h3>{currentEvent.volunteerObjects[key].name}</h3>
          <Availability
          availability={currentEvent.volunteerObjects[key].times}
          desiredHours={currentEvent.volunteerObjects[key].desiredHours}
          />{Object.keys(currentEvent.volunteerObjects[key].jobs).length > 0 ?
          <div className='jobs-body'>
            <h4>Jobs</h4>
            {this._generateJobElements(currentEvent.volunteerObjects[key].jobs)}
          </div> : null}
          <div className='options'>
            <button onClick={this._handleForceAssignClick.bind(this, key, currentEvent.volunteerObjects[key].name)}>Force Assign Job</button>
          </div>
        </div>
      )
    }
    return availabilityElements
  }

  _handleForceAssignClick(ID, name, event) {
    event.preventDefault()
    if (confirm(`Are you sure you want to force assign ${name}?`)) {
      currentEvent.forceAssignVolunteer = {
        personID: ID,
        name: name
      }
      browserHistory.push('/vms2/home/event/force-assign-portal')
    }
  }

  _generateJobElements(jobs) {
    var jobElements = []
    Object.keys(jobs).map((jobID) => {
      jobElements.push(
        <div key={jobID} className='job'>
        <h5 className="col-sm-3">Job Name: {jobs[jobID].job_name}</h5>
        <h5 className="col-sm-3">Job Date: {jobs[jobID].job_date}</h5>
        <h5 className="col-sm-3">Job Time: {jobs[jobID].job_time_start + ' ' + jobs[jobID].job_time_end}</h5>
        <h5 className="col-sm-3">Job Location: {jobs[jobID].location}</h5>
        </div>
      )
    })
    return jobElements
  }

  _handleBackClick(event) {
    event.preventDefault()
    browserHistory.goBack()
  }
}

export default AllAvailability;
