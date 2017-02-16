import { browserHistory } from 'react-router';
import Api from '../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';

require('./adminPortal.less')
require('./../../commonStyles/input.less')

class CreateNewEvent extends React.Component {

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
			<input ref='phone' type="text" id='phone'></input>
		</div>
		<div className='password'>
		<div>
			<label>Ending Date:</label>
			<input ref='passwordCheck' type="text" id='passwordCheck'></input>
		</div>
		</div>
		<button type="submit" onClick={this._handleSubmit.bind(this)}>Submit New Event</button>
		<button type="submit" onClick={this._handleBack.bind(this)}>Back</button>
					</form>
		</section>
	)}

	_handleSubmit(event) {
		event.preventDefault()
		const request = new Api()
		request.createEvent().then(() => {
			browserHistory.push('/vms/home')
		})
	}

	_handleBack(event) {
		event.preventDefault()
			if (confirm('Are you sure you would like to return to login screen? All data entered will be lost.')){
				browserHistory.push('/vms/home')
			}
	}
}

export default CreateNewEvent;
