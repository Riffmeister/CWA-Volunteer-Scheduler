import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import CheckAvailability from './homePage/shared/checkAvailability';
import Login from './entryPage/login';
import Header from '../shared/header';
import Footer from '../shared/footer';
import Home from './homePage/home';
import SignUp from './entryPage/signup';
import CreateNewJob from './homePage/admin/newJob';
import CreateNewEvent from './homePage/admin/newEvent';
import EventPortal from './homePage/shared/eventPortal';
import SetAvailability from './homePage/shared/setAvailability';
import Support from './shared/support';

module.exports = (
<Route path='/vms' component={App}>
	<IndexRoute component={Login}/>
		<Route path="/vms/signup" component={SignUp}/>
		<Route path="/vms/home" component={Home}/>
		<Route path="/vms/support" component={Support}/>
		<Route path="/vms/home/create-new-event" component={CreateNewEvent}/>
		<Route path="/vms/home/event" component={EventPortal}/>
		<Route path="/vms/home/event/set-availability" component={SetAvailability}/>
		<Route path="/vms/home/event/create-new-job" component={CreateNewJob}/>
		<Route path="/vms/home/event/check-availability" component={CheckAvailability}/>
		<Route path="*" component={Login} />
</Route>
)
