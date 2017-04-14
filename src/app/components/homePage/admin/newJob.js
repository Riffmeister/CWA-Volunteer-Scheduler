import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import DatePicker from '../shared/datePicker';

require('./newJob.less')
require('../../app.less')


@observer
class CreateNewJob extends React.Component {

	componentWillMount() {
		currentEvent.selectedDates = []
		this.snackalert = ''
	}

	render() {
		return (
		<section id='new-job'>
		<h1>Create Job(s)!</h1>
		<DatePicker />
		<div className='data-input'>
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
		<button type="submit" onClick={this._handleSubmit.bind(this)}>Create Job(s)</button>
		<button type="submit" onClick={this._handleBack.bind(this)}>Back</button>
					</form>
					</div>
					<div className="snackbar" ref='snackbar'>{this.snackalert}</div>
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
    if (this.refs.startTime.value == '') {
      return true
    }
    if (this.refs.endTime.value == '') {
      return true
    }
		return false
	}

	_changeAlert(value){
		this.snackalert = value;
		this.setState(() => {return true;})
	}

	_showSnackBar(){
		var t = this.refs.snackbar
			t.classList = "snackbar show";

			return setTimeout(function(){ t.classList = "snackbar"; }, 2000);
	}

	_handleSubmit(event) {
		event.preventDefault()
		if (currentEvent.selectedDates.length) {
		if (this._fieldsFilled(event)) {
			this._changeAlert('Please input all values')
			this._showSnackBar()
			return false
		} else {
			var id = this._changeAlert('Please give us a moment to create your jobs.')//setTimeout(function() { alert('Please give us a moment to create your jobs.'); }, 2000);
			this._showSnackBar()
			currentEvent.selectedDates.map((date) => {
				var request = new Api()
	      request.createJob(
	        currentEvent.eventID,
	        this.refs.jobName.value,
	        this.refs.description.value,
	        this.refs.location.value,
	        date,
	        this.refs.startTime.value,
	        this.refs.endTime.value).then((response) => {
						//alert('Job Successfully Created!')
						this._changeAlert('Job Successfully Created!')
						this._showSnackBar()
			})
		})
		clearTimeout(id)
			}
		} else {
			//alert('Please select one or more dates.')
			this._changeAlert('Select one or more dates')
			this._showSnackBar()
		}
	}

	_handleBack(event) {
		event.preventDefault()
		var eventJobsRequest = new Api()
		eventJobsRequest.getEvent(currentEvent.eventID).then((response) => {
			currentEvent.jobs = []
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

export default CreateNewJob;
