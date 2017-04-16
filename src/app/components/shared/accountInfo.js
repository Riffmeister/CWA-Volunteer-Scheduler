import { browserHistory } from 'react-router';
import React from 'react'

import userStore from '../../user/userStore';

require('./accountInfo.less')
require('./../../commonStyles/input.less')

class AccountInfo extends React.Component {
  render() {
    return (
      <section className='data-input' id='account-info'>
          <h2>Account Info</h2>
          <form ref='signup'>
					<div>
						<label>First Name:</label>
						<input ref='firstName' type="text" id='firstName' disabled defaultValue={userStore.firstName}></input>
					</div>
					<div>
						<label>Last Name:</label>
						<input ref='lastName' type="text" id='lastName' disabled defaultValue={userStore.lastName}></input>
					</div>
          <div>
            <label>Date of Birth:</label>
            <input ref='birth' type="date" id='birth' disabled defaultValue={userStore.dateOfBirth}></input>
          </div>
					<div>
	          <label>Email:</label>
	          <input ref='email' type="text" id='email' disabled defaultValue={userStore.email} required ></input>
          </div>
					<div>
						<label>Phone Number:</label>
						<input ref='phone' type="text" id='phone' defaultValue={userStore.phoneNumber}></input>
					</div>
          <div>
            <label>Phone Provider:</label>
            <select ref='phoneProvider' type='text' id='phone' defaultValue={userStore.phoneProvider}>
              <option value=""></option>
              <option value="AT&T"> AT&T</option>
              <option value="Sprint">Sprint</option>
              <option value="Verizon">Verizon</option>
              <option value="Cricket">Cricket</option>
              <option value="T-Mobile">T-Mobile</option>
            </select>
          </div>
          </form>
        <button onClick={this._handleBackClick.bind(this)}>Back to Previous Page</button>
      </section>
    )
  }

  _handleBackClick(event) {
    event.preventDefault()
    browserHistory.goBack()
  }

  _handleSaveClick(event) {
    event.preventDefault()
    alert('Information Submitted')
  }
}

export default AccountInfo;
