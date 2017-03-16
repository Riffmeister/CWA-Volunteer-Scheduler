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
  }

    render() {
      return (
       <div className='date-picker'>
         <h3>Select One or More Dates(scroll to view more):</h3>
         <div className='dates'>
          {this._generateDateElements()}
         </div>
       </div>
        )
    }

    _generateDateElements() {
      var weekDay = {0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday', 6: 'Saturday'}
      var dateElements = currentEvent.dates.map((date) => {
        var year = date.substring(0, 4)
        var month = date.substring(5, 7)
        var day = date.substring(8, 10)
        var dateString = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        var reDate = month + '-' + day + '-' + year
        return (
          <div key={date} className='date'>
            <button ref={date}
            onClick={this._handleDateClick.bind(this, date)}>
              <div className='date-content'>
                <p>{weekDay[dateString.getDay()]}</p>
                <p>{reDate}</p>
              </div>
            </button>
          </div>
        )
      })

      return dateElements
    }

    _handleDateClick(date, event) {
      event.preventDefault()
      if (currentEvent.selectedDates.includes(date)){
        var index = currentEvent.selectedDates.indexOf(date)
        if (index > -1) {
          currentEvent.selectedDates.splice(index, 1)
        }
        this.refs[date].classList = ''
      } else {
        currentEvent.selectedDates.push(date)
        this.refs[date].classList = 'selected'
      }
    }
}
export default DatePicker;
