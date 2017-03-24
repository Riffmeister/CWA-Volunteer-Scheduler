import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../../shared/header';
import GlobalEvents from '../shared/globalEvents';
import NewEvent from './newEvent';
import allUserStore from '../../../user/allUserStore';
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
        </div>
          <div className='confirmation'>
            <button onClick={this._handleCreateEvent.bind(this)}>
              Create New Event
            </button>
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
      allUserStore.users = []
      for (var key in response.body) {
        allUserStore.users.push({
          personID: key,
          personName: response.body[key].first_name + ' ' + response.body[key].last_name,
          phoneNumber: response.body[key].phone_number,
          admin: response.body[key].admin_status === 'true' ? true : false,
          driver: response.body[key].driver_status === 'true' ? true : false,
          phoneProvider: response.body[key].phone_provider,
          email: response.body[key].email,
          birthDate: response.body[key].date_of_birth
        })
      }
      browserHistory.push('/vms/home/promotion')
    })
  }
}
export default AdminPortal;
