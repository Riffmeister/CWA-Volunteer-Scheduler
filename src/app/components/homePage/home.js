import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../shared/header';
import VolunteerPortal from './volunteerPortal';
import AdminPortal from './adminPortal';

require('./home.less')
class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
			<section id='home'>
				{false ? <VolunteerPortal /> : <AdminPortal />}
			</section>
        )
    }
}
export default Home;
