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

    componentDidMount() {
      alert(`Do not use any of the browser's refresh or back buttons while within this application.`)
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
                userStore.personID = response.body.personID
                userStore.loggedOn = true
                userStore.isAdmin = response.body.isAdmin
                response.body.eventIds.map((eventID) => {
                  userStore.events.push(`${eventID}`)
                })

                var eventRequest = new Api()
                eventRequest.getEvents().then((response) => {
                  eventStore.events = []
                  for (var key in response.body) {
                    eventStore.events.push({eventID: key, eventName: response.body[key].event_name, eventDates: response.body[key].eventDays})
                  }
                  browserHistory.push('/vms/home')
                }).catch((error) => {
                  console.log(error)
                })

              }).catch((error) => {
                alert('Unsuccessful Login')
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
