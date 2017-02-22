import { observer } from 'mobx-react';
import AdminPortal from './admin/adminPortal';
import Header from './../../shared/header';
import React from 'react';
import ReactDOM from 'react-dom';
import userStore from '../../user/userStore';
import VolunteerPortal from './volunteer/volunteerPortal';

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
