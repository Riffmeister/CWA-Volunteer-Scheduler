import { observer } from 'mobx-react';
import { browserHistory } from 'react-router';

import Api from '../../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import allUserStore from '../../../user/allUserStore';
import Person from './person';

require('./promotionPortal.less')

@observer
class PromotionPortal extends React.Component {

  render() {
      return (
        <section id='promotion-portal'>
          <div className='header'>
            <h2>User Statuses</h2>
            <button onClick={this._handleBackClick.bind(this)}>Back</button>
          </div>
          <div className='promotion-body'>
          {this._createPeopleElements()}
          </div>
        </section>
      )
  }

  _createPeopleElements() {
    var peopleElements = allUserStore.users.map((user, index) => {
      if (user.personName === 'Test Test' || user.personName == 'admin admin') {
        return null
      } else {
      return (
        <Person
        key={user.personID}
        allUserStoreIndex={index}
         />
      )}
    })
    return peopleElements
  }

  _handleBackClick(event) {
    event.preventDefault()
    browserHistory.goBack()
  }
}
export default PromotionPortal;
