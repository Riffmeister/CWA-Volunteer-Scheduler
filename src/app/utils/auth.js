module.exports = {
	login(email, password) {
		if (email === 'root' && password === 'root'){
			return true
		}
		else {
				return false
		}
	},
}
