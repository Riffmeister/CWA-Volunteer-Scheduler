import userStore from '../user/user.js'

var superagent = require('superagent')

class Api {
	login(email, password) {
		var request = superagent.post('https://cwajazz.com/vms/login.py')
		.type('form')
		.send({email: email})
		.send({password: password})
		.then((response) => {
				// TODO: Should return whether the current user has been logged in.
				userStore.isAdmin = true
				console.log(userStore)
				return response.statusCode
		})
	}

	signup(firstName, lastName, email, phone, password) {
		var request = superagent.post('https://cwajazz.com/vms/signup.py')
		.type('form')
		.send({firstName: firstName})
		.send({lastName: lastName})
		.send({email: email})
		.send({phone: phone})
		.send({password: password})
		.end((err, res) => {
			if (err !== null) {
				console.log('error', err)
			} else {
				console.log(res)
				//TODO: Should return whether a user has been added to db.
				return res.statuscode
			}
		})
	}
}

export default Api;
