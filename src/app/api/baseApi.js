import User from '../user/user'

var superagent = require('superagent')

class Api {
	login(email, password) {
		var request = superagent.post('https://cwajazz.com/vms/login.py')
		.send({'email': email, 'password': password})
		.end((err, res) => {
			if (err !== null) {
				console.log('error', err)
			} else {
				User.hello(res)
			}
		})
	}

	signup(firstName, lastName, email, phone, password) {
		var request = superagent.post('https://cwajazz.com/vms/signup.py')
		.send({'firstName': firstName, 'lastName': lastName, 'email': email, 'phone': phone, 'password': password})
		.end((err, res) => {
			if (err !== null) {
				console.log('error', err)
			} else {
				console.log(res)
			}
		})
	}

	check() {
		console.log('hello')
	}
}

export default Api;
