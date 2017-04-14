import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import userStore from '../../../user/userStore';

require('../../app.less')


class CheckAvailability extends React.Component {

  componentWillMount(){
    this.snackalert = ''
  }

    render() {
      return (
       <div className='check-availability'>
        <h2>Current Availability</h2>
         <div className='dates'>
          {this._generateDateElements()}
         </div>
         <div>
          <h3>Desired Hours: {currentEvent.desiredHours ? `${currentEvent.desiredHours}` : `None Given`}</h3>
         </div>
         <div className='confirmation'>
           <button onClick={this._handleMoreAvailabilityClick.bind(this)}>Submit More Availability</button>
           <button onClick={this._handleConfirmAvailability.bind(this)}>Confirm Availability</button>
         </div>
         <div className="snackbar" ref='snackbar'>{this.snackalert}</div>
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


        if (!currentEvent.availability[date]) {
          currentEvent.availability[date] = []
        }
        if (currentEvent.availability[date].length > 0) {
          var timeElements = currentEvent.availability[date].map((time, index) => {
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
            return <div key={time} className='time'>{readableTime}<button onClick={this._handleDeleteTimeClick.bind(this, time, date, index, reDate, readableTime)}>X</button></div>
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

    _changeAlert(value){
      this.snackalert = value;
      this.setState(() => {return true;})
    }

    _showSnackBar(){
      var t = this.refs.snackbar
        t.classList = "snackbar show";

        return setTimeout(function(){ t.classList = "snackbar"; }, 2000);
    }

    _handleDeleteTimeClick(time, date, index, formatDate, formatTime, event) {
      event.preventDefault()
      if (confirm(`Are you sure you want to delete times ${formatTime} on ${formatDate}?`))
      var request = new Api()
      request.deleteAvailability(userStore.personID, currentEvent.eventID, date, time).then((response) => {
        currentEvent.availability[date].splice(index, 1)
        this._changeAlert(`Successfully deleted times ${formatTime} on ${formatDate}`)
        this._showSnackBar()
        //this.setState(() => {return true})
      }).catch((error) => {
        this._changeAlert('Could not delete the selected times, please try again, and if error persists contact the technical team.')
        this._showSnackBar()
        console.log(error)
      })
    }
    _handleConfirmAvailability(event) {
      event.preventDefault()
      if (!currentEvent.desiredHours) {
        this._changeAlert('No Desired Hours Inputted.')
        this._showSnackBar()
        return
      }
      var request = new Api()
      var id = this._changeAlert('Availability Confirmed, loading event page')
      this._showSnackBar()
      request.setAvailability(currentEvent.eventID, userStore.personID, currentEvent.availability, currentEvent.desiredHours).then((response) => {
        clearTimeout(id)
        browserHistory.push('/vms2/home/event')
      }).catch((error) => {
        this._changeAlert('Could Not Confirm Availability')
        this._showSnackBar()
        console.log(error)
      })
    }

    _handleMoreAvailabilityClick(event) {
      event.preventDefault()
      browserHistory.push('/vms2/home/event/set-availability')
    }
}
export default CheckAvailability;
