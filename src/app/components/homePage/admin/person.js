import { observer } from 'mobx-react';

import React from 'react';
import Api from '../../../api/baseApi';
import allUserStore from '../../../user/allUserStore';

require('../../app.less')

@observer
class Person extends React.Component {

  componentWillMount(){
    this.snackalert = ''
  }

  render() {
    return (
    <div className='person'>
      <h3>{allUserStore.users[this.props.allUserStoreIndex].personName}</h3>
      <div className='person-body'>
        <div className='person-body-section'>
          <div>
            <h4>Phone Number:</h4>
            <p>{allUserStore.users[this.props.allUserStoreIndex].phoneNumber ? this._formatPhoneNumber(allUserStore.users[this.props.allUserStoreIndex].phoneNumber) : 'None Provided'}</p>
          </div>
          <div>
            <h4>Email:</h4>
            <p>{allUserStore.users[this.props.allUserStoreIndex].email}</p>
          </div>
          <div>
            <h4>Birth Date:</h4>
            <p>{allUserStore.users[this.props.allUserStoreIndex].birthDate ? allUserStore.users[this.props.allUserStoreIndex].birthDate : 'None Provided'}</p>
          </div>
        </div>
        <div className='person-body-section'>
          <div>
            <h4>Admin Status:</h4>
            <p>{allUserStore.users[this.props.allUserStoreIndex].admin ? 'True' : 'False'}</p>
            <button onClick={this._handleStatusClick.bind(this, 'admin', allUserStore.users[this.props.allUserStoreIndex].admin)}>Add/Remove Admin Status</button>
          </div>
          <div>
            <h4>Driver Status:</h4>
            <p>{allUserStore.users[this.props.allUserStoreIndex].driver ? 'True' : 'False'}</p>
            <button onClick={this._handleStatusClick.bind(this, 'driver', allUserStore.users[this.props.allUserStoreIndex].driver)}>Add/Remove Driver Status</button>
          </div>
        </div>
      </div>
      <div className="snackbar" ref='snackbar'>{this.snackalert}</div>
    </div>
    )
  }

  _changeAlert(value, time){
    this.snackalert = value;
    this.setState(() => {return true;})
    this._showSnackBar(time)
  }

  _showSnackBar(displayTime){
    var t = this.refs.snackbar
      t.classList.add("show")

      return setTimeout(function(){ t.classList.add("snackbar") }, displayTime);
  }

  _handleStatusClick(status, currentState, event) {
    event.preventDefault()
    var request = new Api()
    switch (status) {
      case 'admin':
        request.upgradePerson(allUserStore.users[this.props.allUserStoreIndex].personID, !allUserStore.users[this.props.allUserStoreIndex].admin, allUserStore.users[this.props.allUserStoreIndex].driver).then((response) => {
          allUserStore.users[this.props.allUserStoreIndex].admin = !allUserStore.users[this.props.allUserStoreIndex].admin
          this._changeAlert(`${allUserStore.users[this.props.allUserStoreIndex].personName}'s Admin status is now ${allUserStore.users[this.props.allUserStoreIndex].admin}`, 3000)
        })
        break;
      case 'driver':
        request.upgradePerson(allUserStore.users[this.props.allUserStoreIndex].personID, allUserStore.users[this.props.allUserStoreIndex].admin, !allUserStore.users[this.props.allUserStoreIndex].driver).then((response) => {
          allUserStore.users[this.props.allUserStoreIndex].driver = !allUserStore.users[this.props.allUserStoreIndex].driver
          this._changeAlert(`${allUserStore.users[this.props.allUserStoreIndex].personName}'s Driver status is now ${allUserStore.users[this.props.allUserStoreIndex].driver}`, 3000)
        })
        break;
    }
  }

  _formatPhoneNumber(stringAll) {
    var stringNumber = stringAll.replace(/\D/g, '')
    var numberArray = stringNumber.split('')
    if (numberArray.length === 10) {
      numberArray = numberArray.map((number, index) => {
        if (index === 0) {
          number = '(' + number
        } else if (index === 2) {
          number = number + ')'
        } else if (index === 5) {
          number = number + '-'
        }
        return number
      })
      return numberArray.join('')
    } else if (numberArray.length === 11) {
      numberArray = numberArray.map((number, index) => {
        if (index === 1) {
          number = '(' + number
        } else if (index === 3) {
          number = number + ')'
        } else if (index === 6) {
          number = number + '-'
        }
        return number
      })
      return numberArray.join('')
    } else {
      return stringAll
    }
  }
  _fixDate(date) {
    var year = date.substring(0, 4)
    var month = date.substring(5, 7)
    var day = date.substring(8, 10)
    var dateString = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return month + '-' + day + '-' + year
  }
}

export default Person;
