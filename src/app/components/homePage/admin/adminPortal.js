import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../../shared/header';
import GlobalEvents from '../shared/globalEvents';
import NewEvent from './newEvent';
import userStore from '../../../user/userStore'
import eventStore from '../../../event/eventStore'

require('./adminPortal.less')

@observer
class AdminPortal extends React.Component {

  render() {
      return (
  			<section className='admin-portal'>
        <div className='admin-body'>
  				{ eventStore.events.length > 0 ? <GlobalEvents /> : null}
          <div className='create-new-event'>
  				<button onClick={this._handleCreateEvent.bind(this)}>
  					Create New Event
  				</button>
          </div>
          </div>
          <div className='confirmation'>
            <button onClick={this._handlePromoteClick.bind(this)}>
              Promote Volunteer
            </button>
          </div>
  			</section>
      )
  }

  _handleCreateEvent(event) {
  	event.preventDefault()
  	browserHistory.push('/vms/home/create-new-event')
  }

  _handlePromoteClick(event) {
    event.preventDefault()
    var request = new Api()
    request.getAllPeoples().then((response) => {
      console.log(response)
      currentEvent.jobs = []
      for (var key in response.body) {
        currentEvent.jobs.push({
          jobID: key,
          jobName: response.body[key].job_name,
          jobDescription: response.body[key].job_description,
          jobLocation: response.body[key].location,
          jobDate: response.body[key].job_date,
          jobTime: response.body[key].job_time_start + '-' + response.body[key].job_time_end
        })
      }
    })
  }
}
export default AdminPortal;
