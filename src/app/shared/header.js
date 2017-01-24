import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'

var superagent = require('superagent')

class Header extends React.Component {
  render() {
    return (
	<section className='menu'>
		<div id='header' className='container'>
			<div className='nav-options'>
				<img src='http://www.colorado.edu/cwa/profiles/express/themes/culayers/logo.png' />
				<ul>
					<li><a>Home</a></li>
					<li><a>Header</a></li>
					<li><a>Header</a></li>
					<li onClick={this._handleClickHere.bind(this)}><a>API Test</a></li>
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
	var apiReq = superagent.get('http://ec2-54-70-79-115.us-west-2.compute.amazonaws.com/todo/api/v1.0/tasks')
	.send('{"name":"tj","pet":"tobi"}')
	.end((err, res) => {
		if (err !== null) {
			console.log('error')
		} else {
			console.log(res.statusCode)
		}
	})
}

_handleClick(event){
	event.preventDefault()
	browserHistory.push('/')
  }
}

export default Header;
