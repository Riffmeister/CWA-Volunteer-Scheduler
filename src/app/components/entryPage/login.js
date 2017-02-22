import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import Api from '../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import userStore from '../../user/user'

require('./../../commonStyles/input.less')

@observer
class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            error: '',
            email: '',
            password: ''
        }
    }
    componentWillMount() {
      userStore.loggedOn = false
      userStore.isAdmin = false
    }

    render() {
        return (
            <section className='data-input'>
                <h2 className='center text-uppercase'>Login</h2>
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
        const email = this.refs.email.value
        const password = this.refs.password.value
        if (email === "") {
            alert("Please Enter a Value for Email")
            return false
        } else if (password === "") {
            alert("Please Enter a Value for Password")
            return false
        } else {
			        event.preventDefault()
  	          var request = new Api()
              //TODO: Need to check successful login better than just statusCode.
              request.login(email,password).then((response) => {
                console.log(response)
                userStore.loggedOn = true
                userStore.isAdmin = response.body.isAdmin
                browserHistory.push('/vms/home')
              }).catch((error) => {
                console.log(error)
              })
            }
        }

	_handleSignUp(event) {
		event.preventDefault()
		browserHistory.push('/vms/signup')
	}
}

export default Login;
