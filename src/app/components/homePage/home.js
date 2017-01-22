import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../shared/header';
import GlobalEvents from './globalEvents';
import LocalEvents from './localEvents';

require('./home.less')
class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
			<section id='home'>
				<div className='upcoming-events'>
					<h1>
						Upcoming Events
					</h1>
					<GlobalEvents/>
				</div>
				<div className='my-events'>
					<h1>
						My Events
					</h1>
					<LocalEvents/>
				</div>
			</section>
        )
    }
}
export default Home;
