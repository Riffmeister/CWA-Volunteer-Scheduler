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
	          <input ref='email' type="text" id='email' defaultValue={userStore.email} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" title="Expected input is username@email.com"></input>
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
					<div className='password'>
						<div>
              <label>Change Password:</label>
              <input ref='password' type="password" id='password'></input>
						</div>
						<div>
							<label>Retype Password:</label>
		          <input ref='passwordCheck' type="password" id='passwordCheck'></input>
						</div>
					</div>
          <button type="submit" onClick=''>Save</button>
          </form>
        <button onClick={this._handleBackClick.bind(this)}>Back</button>
      </section>
    )
  }

  _handleBackClick(event) {
    event.preventDefault()
    browserHistory.goBack()
  }
}

export default AccountInfo;
