import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app'
import Login from './login'
import Header from '../shared/header'
import Footer from '../shared/footer'
import Home from './home'
import SignUp from './signup'

module.exports = (
<Route path='/' component={App}>
	<IndexRoute component={Login}/>
		<Route path="/signup" component={SignUp}/>
		<Route path="/home" component={Home}/>
</Route>
)
