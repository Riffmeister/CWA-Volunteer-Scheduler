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
			<input ref='startTime' type="time" id='startingTime' placeholder="07:00 AM" pattern="([01]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1} (am|AM|PM|pm){1}" title="Incorect Input, example = 07:00 AM"></input>
		</div>
    <div>
      <label>End Time:</label>
      <input ref='endTime' type="time" id='endingTime' placeholder="10:00 AM" pattern="([01]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1} (am|AM|PM|pm){1}" title="Incorect Input, example = 10:00 AM"></input>
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




	_correctTimeFormat(){
		console.log("HERE")
		var start = this.refs.startTime.value;
		var end = this.refs.endTime.value;

		var startSplit = start.split(" "); //('11:00', 'PM')
		var endSplit = end.split(" ");

		if(startSplit.length > 1 && endSplit.length > 1){
			var startEnd = startSplit[1];
			if(startEnd == "PM" || startEnd == "pm"){

    		var time = startSplit[0].split(":");
				var startHour = parseInt(time[0]);

				if(startHour < 12){
					startHour = startHour + 12
				}
    	  time[0]= startHour.toString();
			this.refs.startTime.value = time[0]+":"+time[1];
			console.log("start")
			console.log(this.refs.startTime.value)
			}

		  var endEnd = end[1];
			if(endEnd == "PM" || endEnd == "pm"){

    		var time = endSplit[0].split(":");
				var endHour = parseInt(time[0]);

				if(endHour < 12){
					endHour = endHour + 12
				}
    	  time[0]= startHour.toString();
				this.refs.endTime.value = time[0]+":"+time[1];
				console.log("end")
				console.log(this.refs.endTime.value)
			}
		} else if(start.length > 5 || end.length > 5){
			this._changeAlert('Please input correct time format', 2000)
			return true
		} else {
			this._changeAlert('24 Hour time', 2000)
			return false
		}
	}

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

	_handleSubmit(event) {
		event.preventDefault()
		if (currentEvent.selectedDates.length) {
		if (this._fieldsFilled(event)) {
			this._changeAlert('Please input all values', 2000)
			return false
		} else {
			var id = this._changeAlert('Please give us a moment to create your jobs.', 2000)
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
						this._changeAlert('Job Successfully Created!', 2000)
			})
		})
			}
		} else {
			this._changeAlert('Select one or more dates', 2000)
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
