import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'

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
					<div>
						<label>First Name:</label>
						<input ref='firstName' type="text" autoFocus id='firstName'></input>
					</div>
					<div>
						<label>Last Name:</label>
						<input ref='lastName' type="text" id='lastName'></input>
					</div>
					<div>
	                    <label>Email:</label>
	                    <input ref='email' type="text" id='email'></input>
                    </div>
					<div>
						<label>Phone Number:</label>
						<input ref='phone' type="text" id='phone'></input>
					</div>
					<div className='password'>
						<div>
		                    <label>Password:</label>
		                    <input ref='password' type="text" id='password'></input>
						</div>
						<div>
							<label>Retype Password:</label>
		                    <input ref='passwordCheck' type="text" id='passwordCheck'></input>
						</div>
					</div>
                </form>
				<button type="submit" onClick={this._handleSubmit.bind(this)}>Sign Up</button>
				<button type="submit" onClick={this._handleBack.bind(this)}>Back</button>
            </section>
        )
    }

	_emptyFields() {
		if (this.refs.firstName.value == '') {
			return true
		}
		if (this.refs.lastName.value == '') {
			return true
		}
		if (this.refs.email.value == '') {
			return true
		}
		if (this.refs.phone.value == '') {
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
		if (!this._emptyFields(event)){
			if (confirm('Are you sure you would like to return to login screen? All data entered will be lost.')){
				browserHistory.push('/vms')
			}
		} else {
			browserHistory.push('/vms')
		}
	}

    _handleSubmit(event) {
		event.preventDefault()
		if (this._emptyFields(event)) {
			alert('Please enter a value for every field.')
			return false
		} else if (this.refs.password.value !== this.refs.passwordCheck.value) {
			alert('Passwords do not match.')
		} else {
			Api.login(this.refs.email.value, this.refs.password.value)
		}
    }
}
export default SignUp;
