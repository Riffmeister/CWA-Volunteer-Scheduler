import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './datePicker';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import TimeSelector from './time-selector';
import userStore from '../../../user/userStore';

require('../shared/eventPortal.less')


class SetAvailability extends React.Component {

  componentWillMount() {
    currentEvent.selectedDates = []
  }
    render() {
      return (
       <section className='set-availability'>
       <h2>Give Availability for {currentEvent.eventName}</h2>
        <DatePicker />
        <div className='time-setter'>
        <TimeSelector />
        </div>
        <div className='confirmation'>
        <button onClick={this._handleCheckAvailability.bind(this)}>Check Availability</button>
        <button onClick={this._handleBack.bind(this)}>Back</button>
        </div>
       </section>
        )
    }

    _handleBack(event) {
      event.preventDefault()
      browserHistory.goBack()
    }

    _handleCheckAvailability(event) {
      event.preventDefault()
      browserHistory.push('/vms2/home/event/check-availability')
    }
}
export default SetAvailability;
