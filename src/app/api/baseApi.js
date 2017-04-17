import userStore from '../user/userStore';
import eventStore from '../../app/event/eventStore'

var superagent = require('superagent')

class Api {
	assignVolunteer(volunteerID, eventID, jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/assign_job.py')
			.type('form')
			.send({volunteerId: volunteerID})
			.send({eventId: eventID})
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	forceAssignVolunteer(volunteerID, eventID, jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/test/force_assign.py')
			.type('form')
			.send({volunteerId: volunteerID})
			.send({eventId: eventID})
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	unassignVolunteer(volunteerID, eventID, jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/test/unassign_job.py')
			.type('form')
			.send({volunteerId: volunteerID})
			.send({eventId: eventID})
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	unassignVolunteer(volunteerID, eventID, jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/test/unassign_job.py')
			.type('form')
			.send({volunteerId: volunteerID})
			.send({eventId: eventID})
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	unassignVolunteer(volunteerID, eventID, jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/test/unassign_job.py')
			.type('form')
			.send({volunteerId: volunteerID})
			.send({eventId: eventID})
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	unassignVolunteer(volunteerID, eventID, jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms/test/unassign_job.py')
			.type('form')
			.send({volunteerId: volunteerID})
			.send({eventId: eventID})
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	confirmJob(eventID, jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/confirm_job.py')
			.type('form')
			.send({eventId: eventID})
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	completeJob(eventID, jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/complete_job.py')
			.type('form')
			.send({eventId: eventID})
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	deleteAvailability(personID, eventID, date, time) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/delete_availability.py')
			.type('form')
			.send({volunteerId: personID})
			.send({eventId: eventID})
			.send({date: date})
			.send({time: time})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	deleteJob(jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/delete_job.py')
			.type('form')
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	login(email, password) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/login.py')
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
			superagent.post('https://cwajazz.com/vms2/signup.py')
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
			superagent.post('https://cwajazz.com/vms2/create_event.py')
			.type('form')
			.send({eventName: eventName})
			.send({startDate: startDate})
			.send({endDate: endDate})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	createJob(eventId, jobName, jobDescription, location, jobDate, startTime, endTime) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/create_job.py')
			.type('form')
			.send({eventId: eventId})
			.send({jobName: jobName})
			.send({jobDescription: jobDescription})
			.send({location: location})
			.send({jobDate: jobDate})
			.send({startTime: startTime})
			.send({endTime: endTime})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getAllAvailability(eventID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/get_all_availability.py')
			.type('form')
			.send({eventId: eventID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getVolunteersAvailabile(jobID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/get_volunteers_available.py')
			.type('form')
			.send({jobId: jobID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getAvailability(eventID, personID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/get_volunteer_availability.py')
			.type('form')
			.send({personId: personID})
			.send({eventId: eventID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	setAvailability(eventID, personID, timeObject, personDesiredHours) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/set_availability.py')
			.type('form')
			.send({eventId: eventID})
			.send({volunteerId: personID})
			.send({time: JSON.stringify(timeObject)})
			.send({personDesiredHours: personDesiredHours})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getAllPeoples() {
		return new Promise((resolve, reject) => {
			superagent.get('https://cwajazz.com/vms2/get_all_peoples.py')
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getEvents() {
		return new Promise((resolve, reject) => {
			superagent.get('https://cwajazz.com/vms2/get_events.py')
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getEvent(eventID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/get_event_jobs.py')
			.type('form')
			.send({eventId: eventID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	getPersonJobs(personID, eventID) {
			return new Promise((resolve, reject) => {
				superagent.post('https://cwajazz.com/vms2/get_volunteer_jobs.py')
				.type('form')
				.send({volunteerId: personID})
				.send({eventId: eventID})
				.end((error, response) => {
					error ? reject(error) : resolve(response)
				})
			})
		}

	getPersonEvents(personID) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/get_volunteer_events.py')
			.type('form')
			.send({volunteerId: personID})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

	upgradePerson(personID, admin, driver) {
		return new Promise((resolve, reject) => {
			superagent.post('https://cwajazz.com/vms2/upgrade_volunteer.py')
			.type('form')
			.send({volunteerId: personID})
			.send({admin: admin})
			.send({driver: driver})
			.end((error, response) => {
				error ? reject(error) : resolve(response)
			})
		})
	}

}

export default Api;
