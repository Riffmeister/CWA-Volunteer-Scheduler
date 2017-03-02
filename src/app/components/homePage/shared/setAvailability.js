import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './datePicker';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import userStore from '../../../user/userStore';

require('../shared/eventPortal.less')


class SetAvailability extends React.Component {

  componentWillMount() {
    console.log('hello')
  }

    render() {
      return (
       <section className='set-availability'>
        <DatePicker />
        <div className='time-setter'>
          Time Setter
        </div>
       </section>
        )
    }
}
export default SetAvailability;
