import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../../../shared/header';
import GlobalEvents from '../shared/globalEvents';
import userStore from '../../../user/userStore'

require('../home.less')

class Volunteer extends React.Component {

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
			<section className='volunteer-portal'>
			   <GlobalEvents/>
			</section>
        )
    }
}
export default Volunteer;
