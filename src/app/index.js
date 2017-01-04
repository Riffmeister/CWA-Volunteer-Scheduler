import ReactDOM from 'react-dom'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import routes from './components/routes'

ReactDOM.render((
	<section id='cwa-app'>
		<Router routes={routes} history={browserHistory}/>
	</section>
), document.querySelector('section'));
