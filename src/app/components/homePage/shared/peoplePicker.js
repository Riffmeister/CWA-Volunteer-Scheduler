import React from 'react';
import currentJob from '../../../event/currentJob';

class PeoplePicker extends React.Component {

componentWillMount() {
  this._createPeopleElements()
}
  render() {
    return (
      <section className='people-picker'>
        <div className='people'>
          {this._createPeopleElements()}
        </div>
      </section>
    )
  }

  _createPeopleElements() {
    var peopleElements = Object.keys(currentJob.volunteersAvailable).map((personID) => {
      currentJob.volunteersAvailable[personID]['ID'] = personID
      return (
        <div key={personID} className='person'>
          <button ref={personID}
          onClick={this._handlePersonClick.bind(this, personID)}>
          <h3>{currentJob.volunteersAvailable[personID].name}</h3>
          <h4>Assigned Hours: {currentJob.volunteersAvailable[personID].assigned_hours}</h4>
          <h4>Desired Hours: {currentJob.volunteersAvailable[personID].desired_hours}</h4>
          </button>
        </div>
      )
    })
    return peopleElements
  }

  _handlePersonClick(personID, event) {
    event.preventDefault()
    if (currentJob.selectedPerson && (currentJob.selectedPerson === currentJob.volunteersAvailable[personID])) {
      this.refs[currentJob.selectedPerson.ID].classList = ''
      currentJob.selectedPerson = {}
    } else if (currentJob.selectedPerson){
      this.refs[currentJob.selectedPerson.ID].classList = ''
      currentJob.selectedPerson = currentJob.volunteersAvailable[personID]
      this.refs[personID].classList = 'selected'
    } else {
      this.refs[personID].classList = 'selected'
      currentJob.selectedPerson = currentJob.volunteersAvailable[personID]
    }
  }
}

export default PeoplePicker;
