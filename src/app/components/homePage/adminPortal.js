import { browserHistory } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../shared/header';
import GlobalEvents from './globalEvents';
import LocalEvents from './localEvents';
import NewEvent from './newEvent';
import userStore from '../../user/user'

require('./adminPortal.less')

class AdminPortal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
		//TODO: Need to check whether there are any global events already created
        return (
			<section className='admin-portal'>
				{false ? this._currentEvents() : null}
				<div className='create-event' onClick={this._handleCreateEvent.bind(this)}>
					Create New Event
				</div>
			</section>
        )
    }

	_currentEvents() {
		return (
			<div className='current-events'>
				Current Events
			</div>
		)
	}

	_handleCreateEvent(event) {
		event.preventDefault()
		browserHistory.push('/vms/home/create-new-event')
	}
}
export default AdminPortal;
