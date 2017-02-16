import { observer } from 'mobx-react';
import AdminPortal from './adminPortal';
import Header from './../../shared/header';
import React from 'react';
import ReactDOM from 'react-dom';
import userStore from '../../user/user.js'
import VolunteerPortal from './volunteerPortal';

require('./home.less')

@observer
class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
      if (userStore.loggedOn === false) {
        browserHistory.push('/vms')
      }
    }

    render() {
        return (
			<section id='home'>
				{userStore.isAdmin ? <AdminPortal /> : <VolunteerPortal />}
			</section>
        )
    }
}
export default Home;
