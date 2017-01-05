import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import * as auth from '../utils/auth';

require('../utils/auth')
require('./input.less')




class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            error: '',
            email: '',
            password: ''
        }
    }


    // TODO: will need an action and method="post" on this form tag to direct to server
    // Let's style the input's and labels to put some space without using <br>
    render() {
        return (
			<section className='data-input'>
                <h1>Sign Up!</h1>
                <form ref='signup'>
                    <label>Email:</label>
                    <input ref='email' type="text" autoFocus id='email'></input>
                    <br></br>
					<label>Phone Number:</label>
					<input ref='phone' type="text" autoFocus id='phone'></input>
					<br></br>
                    <label>Password:</label>
                    <input ref='password' type="text" id='password'></input>
					<br/>
					<label>Retype Password:</label>
                    <input ref='passwordCheck' type="text" id='passwordCheck'></input>
                    <br></br>
                    <button type="submit" onClick={this._handleSubmit.bind(this)}>Sign Up</button>
					<button type="submit" onClick={this._handleBack.bind(this)}>Back</button>
                </form>
            </section>
        )
    }

	_emptyFields() {
		if (this.refs.email.value !== '') {
			return true
		}
		if (this.refs.phone.value !== '') {
			return true
		}
		if (this.refs.password.value !== '') {
			return true
		}
	}

	_handleBack(event) {
		event.preventDefault()
		if (this._emptyFields(event)){
			if (confirm('Are you sure you would like to return to login screen? All data entered will be lost.')){
				browserHistory.push('/')
			}
		} else {
			browserHistory.push('/')
		}
	}

    _handleSubmit(event) {
		event.preventDefault()
        const email = this.refs.email.value
        const password = this.refs.password.value
		const passwordCheck = this.refs.passwordCheck.value
		const phone = this.refs.phone.value
        if (email === '') {
            alert("Please Enter a Value for Email")
            return false
        } else if (phone === '') {
            alert("Please Enter a Value for Password")
            return false
        } else if (password === '') {
			alert("Please Enter a Value for Password")
			return false
		}  else if (password !== passwordCheck) {
			alert("Please Enter Matching Passwords")
			return false
		} else {
            const email = this.refs.email.value
            const password = this.refs.password.value
			// TODO: Need to either have some kind of check here, or put in the logic to
			// send to database to add new user
			if (true) {
				browserHistory.push('/')
				// this.refs.login.reset()
			}
        }
    }
}
export default SignUp;
