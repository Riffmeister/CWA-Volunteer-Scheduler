import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import { reaction, observable } from 'mobx';
import Api from '../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import userStore from '../user/userStore'
import currentEvent from '../event/currentEvent'

require('./header.less')

@observer
class Header extends React.Component {

  render() {
    return (
	<section className='menu'>
		<div id ='header-section' className=' content-container'>
      <header>
        <img src='http://www.colorado.edu/cwa/profiles/express/themes/culayers/logo.png' />
        <h1>Volunteer Management System</h1>
      </header>
      <div id ='options'>
  			<nav className='nav-options'>
  				<ul>
            <li onClick={this._handleClick.bind(this, 'account')}><a>Account</a></li>
  				</ul>
  			</nav>
  			<div className='auth-option'>
  				<ul>

  					<li onClick={this._handleClick.bind(this, 'logout')}><a>Logout</a></li>
  				</ul>
  			</div>
      </div>
		</div>
    </section>
)}

_handleClick(redirect, event){
	event.preventDefault()
  switch (redirect) {
    case 'account':
    if (userStore.loggedOn) {
      browserHistory.push('/vms2/account')
    } else {
      alert('You must be logged on to see your account information.')
    }
      break;

    case 'logout':
      if (confirm('Are you sure you would like to logout?')) {
        browserHistory.push('/vms2')
      }
      break;

    case 'availability':
      if(!userStore.loggedOn){
        alert('You must be logged to see availability.')
      } else if(currentEvent.eventName == ''){
        alert('You must have select an event to see availability')
      } else {
        event.preventDefault()
        var request = new Api()
        var id = setTimeout(function() { alert('Please give us a moment to get your availability.'); }, 1000);

        request.getAvailability(currentEvent.eventID, userStore.personID).then((response) => {
          currentEvent.availability = response.body.availableTimes
          currentEvent.desiredHours = response.body.desiredHours
          clearTimeout(id)
          browserHistory.push('/vms2/home/event/check-availability')
        })
      }

      break;
  }
}

}

export default Header;
