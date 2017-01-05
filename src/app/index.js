import ReactDOM from 'react-dom'
import React from 'react'
import { Router, Route, browserHistory } from 'react-router'

import routes from './components/routes'

require('./index.less')

ReactDOM.render((
	<section id='medium-container'>
		<Router routes={routes} history={browserHistory}/>
	</section>
), document.querySelector('section'));
