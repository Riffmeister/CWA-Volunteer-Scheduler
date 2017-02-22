import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import userStore from '../../../user/userStore';

class DatePicker extends React.Component {

  componentWillMount() {
    console.log('hello')
  }

    render() {
      var dateElements = currentEvent.dates.map((date) => {
        return (
          <div key={date}><button>{date}</button></div>
        )
      })
      return (
       <div className='date-picker'>
       Date Picker
       <div className='dates'>
        {dateElements}
       </div>
       </div>
        )
    }
}
export default DatePicker;
