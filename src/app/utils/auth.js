var superagent = require('superagent')


module.exports = {
	login(email, password) {
		var apiReq = superagent.get('http://ec2-54-70-79-115.us-west-2.compute.amazonaws.com/login')
		.set('Content-Type', 'application/json')
		.send('{"name":"tj","pet":"tobi"}')
		.end((err, res) => {
			if (err !== null) {
				console.log('error')
			} else {
				console.log(res)
			}
		})
		console.log(apiReq)
		if (email === 'root' && password === 'root'){
			return true
		}
		else {
				return false
		}
	},
}
