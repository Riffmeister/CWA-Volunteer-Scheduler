import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import Api from '../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import userStore from '../../user/userStore'
import eventStore from '../../event/eventStore'

require('./../../commonStyles/input.less')

@observer
class Login extends React.Component {

    componentWillMount() {
      userStore.personID = ''
      userStore.loggedOn = false
      userStore.isAdmin = false
      userStore.events = []
      eventStore.events = []
      eventStore.jobs = []
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
                    <input ref='password' type="password" id='password'></input>
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
              request.login(email,password).then((response) => {
                console.log('login', response)
                userStore.userID = response.body.personID
                userStore.loggedOn = true
                userStore.isAdmin = response.body.isAdmin
                userStore.events = response.body.eventIds

                var eventRequest = new Api()
                eventRequest.getEvents().then((response) => {
                  console.log('events', response)
                  eventStore.events = []
                  for (var key in response.body) {
                    eventStore.events.push({eventID: key, eventName: response.body[key].event_name, startDate: response.body[key].start_date, endDate: response.body[key].end_date})
                  }
                  browserHistory.push('/vms/home')
                }).catch((error) => {
                  console.log(error)
                })

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
