import { browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import Api from '../../api/baseApi';
import React from 'react';
import ReactDOM from 'react-dom';
import userStore from '../../user/userStore'
import eventStore from '../../event/eventStore'

require('./../../commonStyles/input.less')
require('../app.less')

@observer
class Login extends React.Component {

    componentWillMount() {
      this.snackalert = ''
      userStore.personID = ''
      userStore.loggedOn = false
      userStore.isAdmin = false
      userStore.events = []
      userStore.firstName = ''
      userStore.lastName = ''
      userStore.phoneNumber = ''
      userStore.dateOfBirth = ''
      userStore.email = ''
      userStore.phoneProvider = ''
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
                <div className="snackbar" ref='snackbar'>{this.snackalert}</div>

            </section>
        )
    }

    componentDidMount() {
      alert(`Do not use any of the browser's refresh or back buttons while within this application.`)
    }

    _changeAlert(value, time){
      this.snackalert = value;
      this.setState(() => {return true;})
      this._showSnackBar(time)
    }

    _showSnackBar(displayTime){
      var t = this.refs.snackbar
        t.classList = "snackbar show";

<<<<<<< HEAD
        return setTimeout(function(){ t.classList = "snackbar"; }, displayTime);
=======
        return setTimeout(function(){ t.classList = "snackbar"; }, 2000);
>>>>>>> 09cd3e2... added snackbar to page, not globalEvents and eventPortal
    }

    _handleLogin(event) {
		    event.preventDefault()
        const email = this.refs.email.value
        const password = this.refs.password.value
        if (email === "") {
          this._changeAlert("Please Enter Username", 2000)
          return false
        } else if (password === "") {
            this._changeAlert("Please Enter Password", 2000)
            return false
        } else {
			        event.preventDefault()
  	          var request = new Api()
              var id =  this._changeAlert("Logging in, please wait", 2000)
              request.login(email,password).then((response) => {
                userStore.personID = response.body.personID
                userStore.loggedOn = true
                userStore.isAdmin = response.body.isAdmin
                userStore.firstName = response.body.first_name
                userStore.lastName = response.body.last_name
                userStore.phoneNumber = response.body.phone_number
                userStore.dateOfBirth = response.body.date_of_birth
                userStore.email = response.body.email
                userStore.phoneProvider = response.body.phone_provider
                response.body.eventIds.map((eventID) => {
                  userStore.events.push(`${eventID}`)
                })

                var eventRequest = new Api()
                eventRequest.getEvents().then((response) => {
                  eventStore.events = []
                  for (var key in response.body) {
                    eventStore.events.push({eventID: key, eventName: response.body[key].event_name, eventDates: response.body[key].eventDays})
                  }
                  clearTimeout(id)
                  browserHistory.push('/vms2/home')
                }).catch((error) => {
                  console.log(error)
                })

              }).catch((error) => {
                this._changeAlert("Unsuccessful Login", 2000)
                console.log(error)
              })
            }
        }

	_handleSignUp(event) {
		event.preventDefault()
		browserHistory.push('/vms2/signup')
	}
}

export default Login;
