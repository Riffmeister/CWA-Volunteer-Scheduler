import React from 'react';
import ReactDOM from 'react-dom';
import Header from './shared/header.jsx';

class Login extends React.Component {
  render() {
    return <div>
		<Header />
		<h1>Login</h1>
			<form action="">
		  		<label>Email:</label>
		  			<input type="text"></input>
				<br></br>
				<label>Password:</label>
					<input type="text"></input>
				<br></br>
		  		<input type="submit" value="Sign In"></input>
				<input type="submit" value="Sign Up"></input>
			</form>
    	</div>
  }
}
export default Login;
// ReactDOM.render(<Login/>, document.getElementById('login'));
