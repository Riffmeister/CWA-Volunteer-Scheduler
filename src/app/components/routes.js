import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import AllAvailability from './homePage/admin/allAvailability';
import AccountInfo from './shared/accountInfo';
import AssignPortal from './homePage/admin/assignPortal';
import CheckAvailability from './homePage/shared/checkAvailability';
import Login from './entryPage/login';
import Header from '../shared/header';
import Footer from '../shared/footer';
import Home from './homePage/home';
import ForceAssignPortal from './homePage/admin/forceAssignPortal';
import SignUp from './entryPage/signup';
import CreateNewJob from './homePage/admin/newJob';
import CreateNewEvent from './homePage/admin/newEvent';
import EventPortal from './homePage/shared/eventPortal';
import JobPortal from './homePage/shared/jobPortal';
import PromotionPortal from './homePage/admin/promotionPortal';
import SetAvailability from './homePage/shared/setAvailability';
import Support from './shared/support';

module.exports = (
<Route path='/vms2' component={App}>
	<IndexRoute component={Login}/>
		<Route path="/vms2/account" component={AccountInfo}/>
		<Route path="/vms2/signup" component={SignUp}/>
		<Route path="/vms2/home" component={Home}/>
		<Route path="/vms2/support" component={Support}/>
		<Route path="/vms2/home/promotion" component={PromotionPortal}/>
		<Route path="/vms2/home/create-new-event" component={CreateNewEvent}/>
		<Route path="/vms2/home/event" component={EventPortal}/>
		<Route path="/vms2/home/event/volunteer-availability" component={AllAvailability}/>
		<Route path="/vms2/home/event/force-assign-portal" component={ForceAssignPortal}/>
		<Route path="/vms2/home/event/job" component={JobPortal}/>
		<Route path="/vms2/home/event/job/assign" component={AssignPortal}/>
		<Route path="/vms2/home/event/set-availability" component={SetAvailability}/>
		<Route path="/vms2/home/event/create-new-job" component={CreateNewJob}/>
		<Route path="/vms2/home/event/check-availability" component={CheckAvailability}/>
		<Route path="*" component={Login} />
</Route>
)
