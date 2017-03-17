import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
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
  			<nav className='nav-options'>
  				<ul>
            <li><a href="http://www.colorado.edu/cwa/" target="out" title="Conference on World Affairs Home"><i className="fa fa-university"></i> CWA</a></li>
  				</ul>
  			</nav>
  			<div className='auth-option'>
  				<ul>
            <li onClick={this._handleClick.bind(this, 'support')}><a>Support</a></li>
  					<li onClick={this._handleClick.bind(this, 'logout')}><a>Login/Logout</a></li>
  				</ul>
  			</div>
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

_handleClick(redirect, event){
  console.log('redirect', redirect)
	event.preventDefault()
  switch (redirect) {
    case 'support':
      browserHistory.push('/vms/support')
      break;
    case 'logout':
      if (confirm('Are you sure you would like to logout?')) {
        browserHistory.push('/vms')
      }
      break;
  }

  }

}

export default Header;
