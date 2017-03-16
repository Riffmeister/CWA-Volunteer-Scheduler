import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';

require('../shared/eventPortal.less')
require('./../../../commonStyles/input.less')

@observer
class CreateNewJob extends React.Component {

	render() {
		return (
		<section className='data-input'>
		<h1>Create New Job!</h1>
		<form ref='new-event'>
		<div>
			<label>Job Name:</label>
			<input ref='jobName' type="text" autoFocus id='jobName'></input>
		</div>
    <div>
      <label>Location:</label>
      <input ref='location' type="text" id='location'></input>
    </div>
		<div>
			<label>Date:</label>
			<input ref='date' type="date" id='startingDate' placeholder="mm/dd/yyyy" title="Expected pattern is mm/dd/yyyy"></input>
		</div>
    <div>
			<label>Start Time:</label>
			<input ref='startTime' type="time" id='startingTime' placeholder="07:00 AM"></input>
		</div>
    <div>
      <label>End Time:</label>
      <input ref='endTime' type="time" id='endingTime' placeholder="10:00 AM"></input>
    </div>
		<div className="column-form">
      <label>Description:</label>
      <textarea ref='description' rows="5" form="new-event" type="text" id='description'></textarea>
    </div>
		<button type="submit" onClick={this._handleSubmit.bind(this)}>Create New Job</button>
		<button type="submit" onClick={this._handleBack.bind(this)}>Back</button>
					</form>
		</section>
	)}

	_fieldsFilled() {
		if (this.refs.jobName.value == '') {
			return true
		}
		if (this.refs.description.value == '') {
			return true
		}
		if (this.refs.location.value == '') {
			return true
		}
    if (this.refs.date.value == '') {
      return true
    }
    if (this.refs.startTime.value == '') {
      return true
    }
    if (this.refs.endTime.value == '') {
      return true
    }
		return false
	}

	_handleSubmit(event) {
    console.log(this.refs)
		event.preventDefault()
		if (this._fieldsFilled(event)) {
			alert('Please enter a value for every field.')
			return false
		} else {
      var request = new Api()
      request.createJob(
        currentEvent.eventID,
        this.refs.jobName.value,
        this.refs.description.value,
        this.refs.location.value,
        this.refs.date.value,
        this.refs.startTime.value,
        this.refs.endTime.value).then((response) => {
				var eventJobsRequest = new Api()
				eventJobsRequest.getEvent(currentEvent.eventID).then((response) => {
					currentEvent.jobs = []
					for (var key in response.body) {
						currentEvent.jobs.push({
							jobID: key,
							jobName: response.body[key].job_name,
							jobDescription: response.body[key].job_description,
							jobLocation: response.body[key].location,
							jobTimeStart: response.body[key].job_time_start,
							jobTimeEnd: response.body[key].job_time_end,
							volunteerAssigned: response.body[key].volunteer_assigned
						})
					}
					console.log(response)
					browserHistory.push("/vms/home/event")
				})
        console.log(response)
        })
    	}
		}

	_handleBack(event) {
		event.preventDefault()
		browserHistory.goBack()
	}
}

export default CreateNewJob;
