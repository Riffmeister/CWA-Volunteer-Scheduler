import React from 'react';
import ReactDOM from 'react-dom';
import Header from './../shared/header';

require('./style.less')

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: '',
            email: '',
            password: ''
        }
    }
    //will need an action and method="post" on this form tag to direct to server

    render() {
        return (
            <section id='login'>
                <h1>Login</h1>
                <form ref='login'>
                    <label>Email:</label>
                    <input ref='email' type="text" autoFocus id='email'></input>
                    <br></br>
                    <label>Password:</label>
                    <input ref='password' type="text" id='password'></input>
                    <br></br>
                    <button type="submit" onClick={this._handleSubmit.bind(this)}>Login</button>
                    <button type="submit">Sign Up</button>
                </form>
            </section>
        )
    }

    _handleSubmit(event) {
        const email = this.refs.email.value
        const password = this.refs.password.value
        if (email === "") {
            alert("Please Enter a Value for Email")
            return false
        } else if (password === "") {
            alert("Please Enter a Value for Password")
            return false
        } else {
            const email = this.refs.email.value
            const password = this.refs.password.value
            console.log('email', email, 'password', password)
            this.refs.login.reset()
        }
    }
}
export default Login;
