import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'

class Header extends React.Component {
  render() {
    return (
	<div className='menu'>
		<img src='http://www.colorado.edu/cwa/profiles/express/themes/culayers/logo.png' />
		<ul>
			<li onClick={this._handleClick.bind(this)}><a>Home</a></li>
			<li><a>Header</a></li>
			<li><a>Header</a></li>
			<li><a>Header</a></li>

		</ul>
    </div>
)}

  _handleClick(event){
	  event.preventDefault()
	  browserHistory.push('/')
	  console.log('hello')
  }
}

export default Header;
