import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Login from './entryPage/login';
import Header from '../shared/header';
import Footer from '../shared/footer';
import Home from './homePage/home';
import SignUp from './entryPage/signup';
import CreateNewEvent from './homePage/newEvent';

module.exports = (
<Route path='/vms' component={App}>
	<IndexRoute component={Login}/>
		<Route path="/vms/signup" component={SignUp}/>
		<Route path="/vms/home" component={Home}/>
		<Route path="/vms/home/create-new-event" component={CreateNewEvent}/>
</Route>
)
