import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../../shared/header';
import GlobalEvents from './globalEvents';
import EventJobs from '../admin/eventJobs';
import MyJobs from '../volunteer/myJobs';
import NewEvent from '../admin/newEvent';
import userStore from '../../../user/userStore';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import SetAvailability from './setAvailability';

require('./eventPortal.less')

@observer
class EventPortal extends React.Component {

  render() {
    if (userStore.isAdmin) {
    return (
      <section className='event-portal'>
        <h2>{currentEvent.eventName}</h2>
        <div className='event-body'>
          <EventJobs />
          <div className='create-new-job'>
            <button onClick={this._handleCreateJob.bind(this)}>
            Create New Job
            </button>
          </div>
        </div>
    </section>)
  } else {
    return (
      <section className='event-portal'>
        <h2>{currentEvent.eventName}</h2>
        <div className='event-body'>
          <MyJobs />
        </div>
      </section>
    )
  }
}

  _handleCreateJob(event) {
  	event.preventDefault()
  	browserHistory.push('/vms/home/event/create-new-job')
  }
}
export default EventPortal;
