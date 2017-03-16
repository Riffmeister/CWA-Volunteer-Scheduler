import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import eventStore from '../../../event/eventStore';
import currentEvent from '../../../event/currentEvent';
import userStore from '../../../user/userStore';

class TimeSelector extends React.Component {
  overlapStart = ''
  overlapEnd = ''

    render() {
      var timeElements = currentEvent.dates.map((date) => {
        return (
          <div key={date}><button>{date}</button></div>
        )
      })
      return (
       <div className='time-picker'>
         <h3>Submit All Availability Times:</h3>
         <div className='clock'>
           <div id="startTime">
             <label>Starting:</label>
               <div>
               <select ref='startTimeHour'>
                 <option>07</option>
                 <option>08</option>
                 <option>09</option>
                 <option>10</option>
                 <option>11</option>
                 <option>12</option>
                 <option>01</option>
                 <option>02</option>
                 <option>03</option>
                 <option>04</option>
                 <option>05</option>
                 <option>06</option>
               </select>
               </div>
               <p className='colon'>:</p>
               <div className='digits'>
               <select ref='startTimeMinute'>
                 <option>00</option>
                 <option>30</option>
               </select>
               </div>
               <div className='am-pm'>
               <select ref='startTimeDaytime'>
                 <option>AM</option>
                 <option>PM</option>
               </select>
               </div>
             </div>

             <div id="endingTime">
             <label>Ending:</label>
             <div>
             <select ref='endingTimeHour'>
               <option>08</option>
               <option>09</option>
               <option>10</option>
               <option>11</option>
               <option>12</option>
               <option>01</option>
               <option>02</option>
               <option>03</option>
               <option>04</option>
               <option>05</option>
               <option>06</option>
               <option>07</option>
             </select>
             </div>
             <p className='colon'>:</p>
             <div className='digits'>
             <select ref='endingTimeMinute'>
               <option>00</option>
               <option>30</option>
             </select>
             </div>
             <div className='am-pm'>
             <select ref='endingTimeDaytime'>
               <option>AM</option>
               <option>PM</option>
             </select>
             </div>
           </div>
           <div id="timeSubmit">
               <button onClick={this._handleTimeSubmit.bind(this)}>Submit</button>
           </div>
         </div>
         <div className='desired-hours'>
           <label>Desired Number of Hours:</label>
           <input ref='desiredHours' type='number' placeholder={currentEvent.desiredHours ? currentEvent.desiredHours : 0}/>
         </div>
       </div>
        )
    }

    _overlapCheck(startHour, startMinute, endHour, endMinute) {
      var check = false

      var insertArray = []
      if (!(startMinute === endMinute)) {
        if (parseInt(startMinute) === 30) {
          startMinute = .5
        }
        if (parseInt(endMinute) === 30) {
          endMinute = .5
        }
      } else {
        startMinute = 0
        endMinute = 0
      }

      startHour = parseInt(startHour) + startMinute
      endHour = parseInt(endHour) + endMinute
      var range = endHour - startHour

      var numOfNodes = range / .5
      var i = 0
      while (i < numOfNodes) {
        insertArray.push(startHour + (.5 * i))
        i += 1
      }

      currentEvent.selectedDates.map((date) => {
        var dateTimes = currentEvent.availability[date]
        dateTimes.map((time) => {
          var checkArray = []
          var checkStart = parseInt(time.substring(0, 2))
          var checkStartMinute = parseInt(time.substring(3, 5))
          var checkEnd = parseInt(time.substring(6, 8))
          var checkEndMinute = parseInt(time.substring(9, 11))

          if (checkStartMinute === 30) {
            checkStart =  checkStart + .5
          }
          if (checkEndMinute === 30) {
            checkEnd = checkEnd + .5
          }

          var checkRange = checkEnd - checkStart

          var checkNumOfNodes = checkRange / .5

          var j = 0
          while (j < checkNumOfNodes) {
            checkArray.push(checkStart + (.5 * j))
            j += 1
          }

          for (var node in insertArray) {
            if (checkArray.includes(insertArray[node])) {
              if (checkStartMinute === 30) {
                checkStart = checkStart - .5
              }
              if (checkEndMinute === 30) {
                checkEnd = checkEnd - .5
              }

              var startCheckDayTime = 'AM'
              var endCheckDayTime = 'AM'

              if (checkStart > 12) {
                checkStart = checkStart - 12
                startCheckDayTime = 'PM'
              } else if (checkStart === 12) {
                startCheckDayTime = 'PM'
              } else if (checkStart < 10 && checkStart !== 0) {
                checkStart = '0' + checkStart
              } else if (checkStart === 0) {
                checkStart = 12
              }
              if (checkStartMinute !== 30) {
                checkStartMinute = '00'
              }

              if (checkEnd > 12) {
                checkEnd = checkEnd - 12
                endCheckDayTime = 'PM'
              } else if (checkEnd === 12) {
                endCheckDayTime = 'PM'
              } else if (checkEnd < 10 && checkEnd !== 0) {
                checkEnd = '0' + checkEnd
              } else if (checkEnd === 0) {
                checkEnd = 12
              }
              if (checkEndMinute !== 30) {
                checkEndMinute = '00'
              }

              this.overlapEnd = checkStart + ':' + checkStartMinute + ' ' + startCheckDayTime + ' - ' + checkEnd + ':' + checkEndMinute + ' ' + endCheckDayTime
              check = true
              break
            }
          }

        })
      })
      return check
    }

    _handleTimeSubmit() {
      if (currentEvent.selectedDates.length > 0) {
        var startHour = parseInt(this.refs.startTimeHour.value)
        var endHour = parseInt(this.refs.endingTimeHour.value)

        if (this.refs.startTimeDaytime.value === 'PM') {
          if (!(startHour === 12)) {
            startHour = startHour + 12
          }
        } else {
          if (startHour === 12) {
            startHour = '00'
          }
        }
        if (this.refs.endingTimeDaytime.value == 'PM') {
          if (!(endHour === 12)) {
            endHour = endHour + 12
          }
        } else {
          if (endHour === 12) {
            endHour = '00'
          }
        }
        if (startHour < 10 && startHour != '00') {
          startHour = '0' + startHour
        }
        if (endHour < 10 && endHour != '00') {
          endHour = '0' + endHour
        }

        // Checking Inputs!
        if (this._overlapCheck(startHour, this.refs.startTimeMinute.value, endHour, this.refs.endingTimeMinute.value)) {
          alert(`Overlapping Time Entered with ${this.overlapEnd}`)
          return
        }

        if (parseInt(startHour) > parseInt(endHour)) {
          alert('Ending Time Must Be Later Than Starting Time')
          return
        }
        if (parseInt(startHour) === parseInt(endHour)) {
          alert('Start Time Cannot be the Same as End Time')
          return
        }

        var startTime = `${startHour}:${this.refs.startTimeMinute.value}`
        var endTime = `${endHour}:${this.refs.endingTimeMinute.value}`
        var range = `${startTime}-${endTime}`

        var counter = 0
        currentEvent.selectedDates.map((date) => {
          counter += 1
          if (!currentEvent.availability[date].includes(range)) {
            currentEvent.availability[date].push(range)
          }
        })
        alert(`Successfully added ${counter} time slot(s)!`)
      } else if (this.refs.desiredHours.value !== 0 && this.refs.desiredHours.value > 0) {
        currentEvent.desiredHours = this.refs.desiredHours.value
        alert(`Successfully set Desired Hours to ${currentEvent.desiredHours}`)
      } else {
        alert('No Dates Selected')

      }
    }
}
export default TimeSelector;
