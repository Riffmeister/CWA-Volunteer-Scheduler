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
      <label>Description:</label>
      <input ref='description' type="text" id='description'></input>
    </div>
    <div>
      <label>Location:</label>
      <input ref='location' type="text" id='location'></input>
    </div>
    <div>
      <label>Volunteers Needed:</label>
      <input ref='volunteerNeeded' type="number" id='volunteerNeeded'></input>
    </div>
		<div>
			<label>Date:</label>
			<input ref='date' type="date" id='startingDate'></input>
		</div>
    <div>
			<label>Start Time:</label>
			<input ref='startTime' type="time" id='startingTime'></input>
		</div>
    <div>
      <label>End Time:</label>
      <input ref='endTime' type="time" id='endingTime'></input>
    </div>
		<button type="submit" onClick={this._handleSubmit.bind(this)}>Submit New Event</button>
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
    if (this.refs.volunteerNeeded.value == '') {
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
        this.refs.endTime.value,
        this.refs.volunteerNeeded.value
      ).then((response) => {
				var eventJobsRequest = new Api()
				eventJobsRequest.getEvent(currentEvent.eventID).then((response) => {
					currentEvent.jobs = []
					for (var key in response.body) {
						currentEvent.jobs.push({
							jobID: key,
							jobName: response.body[key].job_name,
							jobDescription: response.body[key].job_description,
							jobLocation: response.body[key].location,
							jobSkill: response.body[key].job_skill,
							jobTimeStart: response.body[key].job_time_start,
							jobTimeEnd: response.body[key].job_time_end,
							volunteerNeeded: response.body[key].volunteer_needed,
							volunteersAssigned: response.body[key].volunteer_assigned
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
			if (confirm('Are you sure you would like to return to login screen? All data entered will be lost.')){
				browserHistory.push('/vms/home/event')
			}
	}
}

export default CreateNewJob;
