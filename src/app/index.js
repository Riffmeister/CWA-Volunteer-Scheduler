import ReactDOM from 'react-dom'
import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Login from './components/login'
import Header from './shared/header'

ReactDOM.render((
	<section id='cwa-app'>
		<Header/>
		<Router history={hashHistory}>
			<Route path="/" component={Login}/>
				<Route path="/Header" component={Header}/>
		</Router>
		<Header/>
</section>
), document.querySelector('section'));
