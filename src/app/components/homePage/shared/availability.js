import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import userStore from '../../../user/userStore';


class Availability extends React.Component {
  render() {
    return (
     <div className='check-availability'>
      <h2>Current Availability</h2>
       <div className='dates'>
        {this._generateDateElements()}
       </div>
       <div>
        <h3>Desired Hours: {this.props.desiredHours ? `${this.props.desiredHours}` : `None Given`}</h3>
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


      if (!this.props.availability[date]) {
        this.props.availability[date] = []
      }
      if (this.props.availability[date].length > 0) {
        var timeElements = this.props.availability[date].map((time, index) => {
          var startHour = parseInt(time.substring(0, 2))
          var startMinute = time.substring(3, 5)
          var endHour = parseInt(time.substring(6, 8))
          var endMinute = time.substring(9, 11)
          var startDayTime = ''
          var endDayTime = ''

          if (startHour === 0 || startHour < 12) {
            if (startHour < 10 && startHour !== 0) {
              startHour = '0' + startHour
            } else if (startHour === 0) {
              startHour = 12
            }
            startDayTime = 'AM'
          } else {
            if (startHour !== 12) {
            startHour = startHour - 12
            }
            if (startHour < 10) {
              startHour = '0' + startHour
            }
            startDayTime = 'PM'
          }

          if (endHour === 0 || endHour < 12) {
            if (endHour < 10 && endHour !== 0) {
              endHour = '0' + endHour
            } else if (endHour === 0) {
              startHour = 12
            }
            endDayTime = 'AM'
          } else {
            if (endHour !== 12){
            endHour = endHour - 12
            }
            if (endHour < 10) {
              endHour = '0' + endHour
            }
            endDayTime = 'PM'
          }

          var readableTime = startHour + ':' + startMinute + ' ' + startDayTime + ' - ' + endHour + ':' + endMinute + ' ' + endDayTime
          return <div key={time} className='time'>{readableTime}</div>
        })
      }
      return (
        <div key={date} className='single-date'>
          <div className='date-content'>
            <p>{weekDay[dateString.getDay()]}</p>
            <p>{reDate}</p>
          </div>
          <div className='times'>
          {timeElements}
          </div>
        </div>
      )
    })
    return dateElements
  }
}
export default Availability;
