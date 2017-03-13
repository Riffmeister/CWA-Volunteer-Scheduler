import { browserHistory } from 'react-router';

import Api from '../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';

require('./../../commonStyles/input.less')

class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            error: '',
            email: '',
            password: ''
        }
    }

    render() {
        return (
			<section className='data-input'>
          <h2>Sign Up!</h2>
          <form ref='signup'>
					<div>
						<label>First Name:</label>
						<input ref='firstName' type="text" autoFocus id='firstName'></input>
					</div>
					<div>
						<label>Last Name:</label>
						<input ref='lastName' type="text" id='lastName'></input>
					</div>
          <div>
            <label>Date of Birth:</label>
            <input ref='birth' type="date" id='birth'></input>
          </div>
					<div>
	          <label>Email:</label>
	          <input ref='email' type="text" id='email'></input>
          </div>
					<div>
						<label>Phone Number:</label>
						<input ref='phone' type="text" id='phone'></input>
					</div>
          <div>
            <label>Phone Provider:</label>
            <select ref='phoneProvider' type='text' id='phone'>
              <option value=""></option>
              <option value="AT&T"> AT&T</option>
              <option value="Sprint">Sprint</option>
              <option value="Verizon">Verizon</option>
              <option value="Cricket">Cricket</option>
            </select>
          </div>
					<div className='password'>
						<div>
              <label>Password:</label>
              <input ref='password' type="password" id='password'></input>
						</div>
						<div>
							<label>Retype Password:</label>
		          <input ref='passwordCheck' type="password" id='passwordCheck'></input>
						</div>
					</div>
          <button type="submit" onClick={this._handleSubmit.bind(this)}>Sign Up</button>
          <button type="submit" onClick={this._handleBack.bind(this)}>Back</button>
                </form>
            </section>
        )
    }

	_fieldsFilled() {
		if (this.refs.firstName.value == '') {
			return true
		}

		if (this.refs.lastName.value == '') {
			return true
		}

    if (this.refs.birth.value == '') {
      return true
    }

		if (this.refs.email.value == '') {
			return true
		}

		if (this.refs.phone.value == '') {
			return true
		}

    if (this.refs.phoneProvider.selectedIndex === -1) {
      return true
    }

		if (this.refs.password.value == '') {
			return true
		}

		if (this.refs.passwordCheck.value == '') {
			return true
		}

		return false
	}

	_handleBack(event) {
		event.preventDefault()
			if (confirm('Are you sure you would like to return to login screen? All data entered will be lost.')){
				browserHistory.push('/vms')
			}
	}

    _handleSubmit(event) {
		event.preventDefault()
		if (this._fieldsFilled(event)) {
			alert('Please enter a value for every field.')
			return false
		} else if (this.refs.password.value !== this.refs.passwordCheck.value) {
			alert('Passwords do not match.')
		} else {
      const choice = this.refs.phoneProvider.selectedIndex
      var request = new Api()
      request.signup(this.refs.firstName.value,
        this.refs.lastName.value,
        this.refs.birth.value,
        this.refs.email.value,
        this.refs.phone.value,
        this.refs.phoneProvider[choice].value,
        this.refs.password.value).then((response) => {
        console.log(response)
        browserHistory.push('/vms')
        })
      }
    }
}

export default SignUp;
