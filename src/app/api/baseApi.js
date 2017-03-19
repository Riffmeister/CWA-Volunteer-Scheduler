import userStore from '../user/userStore';
import eventStore from '../../app/event/eventStore'

var superagent = require('superagent')

class Api {
	login(email, password) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/login.py')
			.type('form')
			.send({email: email})
			.send({password: password})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	signup(firstName, lastName, birth, email, phone, phoneProvider, password) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/signup.py')
			.type('form')
			.send({firstName: firstName})
			.send({lastName: lastName})
			.send({birth: birth})
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
			superagent.post('https://cwajazz.com/vms/create_event.py')
			.type('form')
			.send({eventName: eventName})
			.send({startDate: startDate})
			.send({endDate: endDate})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

// TODO: Fix spelling for jobDescription on server
	createJob(eventId, jobName, jobDescription, location, jobDate, startTime, endTime, volunteerNeeded) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/create_job.py')
			.type('form')
			.send({eventId: eventId})
			.send({jobName: jobName})
			.send({jobDesciption: jobDescription})
			.send({location: location})
			.send({jobSkill: null})
			.send({jobDate: jobDate})
			.send({startTime: startTime})
			.send({endTime: endTime})
			.send({volunteerNeeded: volunteerNeeded})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getAvailability(eventID, personID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/get_volunteer_availability.py')
			.type('form')
			.send({personId: personID})
			.send({eventId: eventID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	setAvailability(eventID, personID, timeObject) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/set_availability.py')
			.type('form')
			.send({eventId: eventID})
			.send({volunteerId: personID})
			.send({time: JSON.stringify(timeObject)})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getEvents() {
		return new Promise((resolve, reject) => {
			superagent.get('https://cwajazz.com/vms/get_events.py')
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getEvent(eventID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/get_event.py')
			.type('form')
			.send({eventId: eventID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getPersonEvents(personID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/get_volunteer_events.py')
			.type('form')
			.send({volunteerId: personID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getPersonJobs(personID, eventID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/get_volunteer_jobs.py')
			.type('form')
			.send({volunteerId: personID})
			.send({eventId: eventID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}


}

export default Api;
