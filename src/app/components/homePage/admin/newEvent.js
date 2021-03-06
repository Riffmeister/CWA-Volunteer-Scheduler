import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';
import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore'

require('./adminPortal.less')
require('./../../../commonStyles/input.less')

@observer
class CreateNewEvent extends React.Component {

	componentWillMount(){
		this.snackalert = ''
	}

	render() {
		return (
		<section className='data-input'>
		<h1>Create New Event!</h1>
		<form ref='new-event'>
		<div>
			<label>Event Name:</label>
			<input ref='eventName' type="text" autoFocus id='eventName'></input>
		</div>
		<div>
			<label>Starting Date:</label>
			<input ref='startingDate' type="date" id='startingDate' placeholder="YYYY-MM-DD" title="Expected pattern is YYYY-MM-DD"></input>
		</div>
		<div>
			<label>Ending Date:</label>
			<input ref='endingDate' type="date" id='endingDate' placeholder="YYYY-MM-DD" title="Expected pattern is YYYY-MM-DD"></input>
		</div>
		<button type="submit" onClick={this._handleSubmit.bind(this)}>Submit New Event</button>
		<button type="submit" onClick={this._handleBack.bind(this)}>Back</button>
					</form>
					<div className="snackbar" ref='snackbar'>{this.snackalert}</div>
		</section>
	)}

	_fieldsFilled() {
		if (this.refs.eventName.value == '') {
			return true
		}
		if (this.refs.startingDate.value == '') {
			return true
		}
		if (this.refs.endingDate.value == '') {
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
	    t.classList.add("show")

	    return setTimeout(function(){ t.classList.add("snackbar")}, displayTime);
	}

	_handleSubmit(event) {
		event.preventDefault()
		if (this._fieldsFilled(event)) {
			this._changeAlert('Please enter a value for every field.', 2000)
			return false
		} else {
      var request = new Api()
			var id = this._changeAlert('Creating event, returning home.', 2500)
      request.createEvent(this.refs.eventName.value,
        this.refs.startingDate.value,
        this.refs.endingDate.value).then((response) => {

					var eventsRequest = new Api()
					eventsRequest.getEvents().then((response) => {
						eventStore.events = []
						for (var key in response.body) {
							eventStore.events.push({eventID: key, eventName: response.body[key].event_name, startDate: response.body[key].start_date, endDate: response.body[key].end_date})
						}
						clearTimeout(id)
						browserHistory.push('/vms2/home')
					})
        })
    	}
		}

	_handleBack(event) {
		event.preventDefault()
			if (confirm('Are you sure you would like to return to event screen? All data entered will be lost.')){
				browserHistory.push('/vms2/home')
			}
	}
}

export default CreateNewEvent;
