import { browserHistory } from 'react-router'
import * as auth from '../../utils/auth';
import Api from '../../api/baseApi'
import React from 'react';
import ReactDOM from 'react-dom';

// require('../utils/auth')
require('./input.less')

class Login extends React.Component {

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
                <h1 className='center text-uppercase'>Login</h1>
                <form ref='login'>
                    <label>Email:</label>
                    <input ref='email' type="text" autoFocus id='email'></input>
                    <br></br>
                    <label>Password:</label>
                    <input ref='password' type="text" id='password'></input>
                    <br></br>
                    <button type="submit" onClick={this._handleLogin.bind(this)}>Login</button>
                    <button type="submit" onClick={this._handleSignUp.bind(this)}>Sign Up</button>
                </form>
            </section>
        )
    }


    _handleLogin(event) {
		event.preventDefault()
		browserHistory.push('/vms/home')

        // const email = this.refs.email.value
        // const password = this.refs.password.value
        // if (email === "") {
        //     alert("Please Enter a Value for Email")
        //     return false
        // } else if (password === "") {
        //     alert("Please Enter a Value for Password")
        //     return false
        // } else {
		// 	event.preventDefault()
		// 	var request = new Api()
		// 	if (request.login(email, password)) {
		// 		browserHistory.push('/vms/home')
		// 	} else {
		// 		alert("Invalid Email/Password")
		// 		this.refs.email.focus()
		// 	}
        // }
    }

	_handleSignUp(event) {
		event.preventDefault()
		browserHistory.push('/vms/signup')
	}
}
export default Login;
