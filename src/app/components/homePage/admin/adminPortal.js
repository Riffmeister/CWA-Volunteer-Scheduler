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
  				{ eventStore.events.length > 0 ? <GlobalEvents /> : null}
          <div className='create-new-event'>
  				<button onClick={this._handleCreateEvent.bind(this)}>
  					Create New Event
  				</button>
          </div>
  			</section>
      )
  }

  _handleCreateEvent(event) {
  	event.preventDefault()
  	browserHistory.push('/vms/home/create-new-event')
  }
}
export default AdminPortal;
