import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import Api from '../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import userStore from '../user/user'

require('./header.less')

@observer
class Header extends React.Component {

  render() {
    return (
	<section className='menu'>
		<div id='header' className='content-container'>
      <img src='http://www.colorado.edu/cwa/profiles/express/themes/culayers/logo.png' />
			<nav className='nav-options'>
				<ul>
					<li><a><i className="fa fa-home fa-2x"></i></a></li>
					<li><a>Events</a></li>
					<li><a>Schedule</a></li>
					<li onClick={this._handleClickHere.bind(this)}><a>My Profile</a></li>
				</ul>
			</nav>
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
