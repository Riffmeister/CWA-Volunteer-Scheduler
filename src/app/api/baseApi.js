import userStore from '../user/user.js';

var superagent = require('superagent')

class Api {
	login(email, password) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/test/TESTlogin.py')
			.type('form')
			.send({email: email})
			.send({password: password})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}


	signup(firstName, lastName, email, phone, phoneProvider, password) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/test/TESTsignup.py')
			.type('form')
			.send({firstName: firstName})
			.send({lastName: lastName})
			.send({email: email})
			.send({phone: phone})
			.send({phoneProvider: phoneProvider})
			.send({password: password})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	createEvent(eventName, startDate, endDate) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/createEvent.py')
			.type('form')
			.send({eventName: eventName})
			.send({startDate: startDate})
			.send({endDate: endDate})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}


}

export default Api;
