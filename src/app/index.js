import ReactDOM from 'react-dom'
import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Login from './components/login'

ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={Login}/>
	</Router>
), document.querySelector('section'));
