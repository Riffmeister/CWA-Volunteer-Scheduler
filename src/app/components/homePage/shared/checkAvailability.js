import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import userStore from '../../../user/userStore';


class CheckAvailability extends React.Component {

  componentWillMount() {
  }

    render() {
      return (
       <div className='check-availability'>
        <h2>Current Availability</h2>
         <div className='dates'>
          {this._generateDateElements()}
         </div>
         <div className='confirmation'>
           <button onClick={this._handleMoreAvailabilityClick.bind(this)}>Submit More Availability</button>
           <button onClick={this._handleConfirmAvailability.bind(this)}>Confirm Availability</button>
         </div>
       </div>
        )
    }

    _generateDateElements() {
      var dateElements = currentEvent.dates.map((date) => {
        if (currentEvent.availability[date].length > 0) {
          console.log(currentEvent.availability)
          var timeElements = currentEvent.availability[date].map((time) => {
            var startHour = parseInt(time.substring(0, 2))
            var startMinute = time.substring(3, 5)
            var endHour = parseInt(time.substring(6, 8))
            var endMinute = time.substring(9, 11)
            var startDayTime = ''
            var endDayTime = ''

            if (startHour === 0 || startHour < 12) {
              if (startHour < 10 && startHour !== 0) {
                startHour = '0' + startHour
              } else {
                startHour = startHour + 12
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
              } else {
                endHour = endHour + 12
              }
              endDayTime = 'PM'
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
            return <div key={time}>{readableTime}</div>
          })
        }
        return (
          <div key={date} className='single-date'>
            <h2>{date}</h2>
            <div className='times'>
            {timeElements}
            </div>
          </div>
        )
      })
      return dateElements
    }

    _handleConfirmAvailability(event) {
      event.preventDefault()
      var request = new Api()
      request.setAvailability(currentEvent.eventID, userStore.personID, currentEvent.availability).then((response) => {
        console.log('set Availability', response)
        browserHistory.push('/vms/home/event')
      })
    }

    _handleMoreAvailabilityClick(event) {
      event.preventDefault()
      browserHistory.push('/vms/home/event/set-availability')
    }
}
export default CheckAvailability;
