import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import React from 'react';
import Availability from '../shared/availability';
import currentEvent from '../../../event/currentEvent';

require('./allAvailability.less')

@observer
class AllAvailability extends React.Component {

  componentWillMount() {
    console.log(currentEvent.volunteerObjects)
  }

  render() {
    return (
      <section id='all-availability'>
      <div className='header'>
        <h2>Volunteers</h2>
        <button onClick={this._handleBackClick.bind(this)}>Back</button>
      </div>
        <div className='volunteer-body'>
        {this._generateAvailabilityElements()}
        </div>
      </section>
    )
  }

  _generateAvailabilityElements() {
    var count = 0
    var availabilityElements = []
    for (var key in currentEvent.volunteerObjects) {
      console.log(key)
      availabilityElements.push(
        <Availability
        key={key}
        availability={currentEvent.volunteerObjects[key].times}
        desiredHours={currentEvent.volunteerObjects[key].desiredHours}
        />)
    }
    return availabilityElements
  }

  _handleBackClick(event) {
    event.preventDefault()
    browserHistory.goBack()
  }
}

export default AllAvailability;
