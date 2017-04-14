import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import { reaction, observable } from 'mobx';
import Api from '../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import userStore from '../user/userStore'

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
  			<div className='auth-option'>
  				<ul>
            <li onClick={this._handleClick.bind(this, 'account')}><a>My Account</a></li>
  					<li onClick={this._handleClick.bind(this, 'logout')}><a>Login/Logout</a></li>
            <li onClick={this._handleClick.bind(this, 'availability')}><a></a></li>
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
      browserHistory.push('vms2/home/event/check-availability')
  }

  }

}

export default Header;
