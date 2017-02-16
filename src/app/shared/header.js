import Api from '../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';

import { browserHistory } from 'react-router'
require('./header.less')
class Header extends React.Component {
  render() {
    return (
	<section className='menu'>
		<div id='header' className='content-container'>
			<div className='nav-options'>
				<img src='http://www.colorado.edu/cwa/profiles/express/themes/culayers/logo.png' />
				<ul>
					<li><a><i className="fa fa-home"></i></a></li>
					<li><a>Events</a></li>
					<li><a>Schedule</a></li>
					<li onClick={this._handleClickHere.bind(this)}><a>My Profile</a></li>
				</ul>
			</div>
			<div className='auth-option'>
				<ul>
					<li onClick={this._handleClick.bind(this)}><a>Login/Logout</a></li>
				</ul>
			</div>
		</div>
    </section>
)}

_handleClickHere(event) {
	event.preventDefault()
	var apiReq = superagent.get('http://ec2-54-70-79-115.us-west-2.compute.amazonaws.com/')
	.end((err, res) => {
		if (err !== null) {
			console.log('error')
		} else {
			console.log(res)
		}
	})
}

_handleClick(event){
	event.preventDefault()
	if (confirm('Are you sure you would like to logout?')) {
		browserHistory.push('/vms')
	}
  }
}

export default Header;
