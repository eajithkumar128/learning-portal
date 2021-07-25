import Login from '../components/Login';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function LoginPage(props) {
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const history = useHistory();

	async function login() {
		try {
			let response = await axios.post('https://ea-backend-api.herokuapp.com/authenticate', {
				username: username,
				password: password,
			});
			window.sessionStorage.setItem('token', response.data.token);
			window.sessionStorage.setItem('username', response.data.username);
			props.setAuthentication(true);
			history.push('/');
		} catch (e) {}
	}

	return (
		<Login
			password={password}
			action={login}
			setPassword={setPassword}
			username={username}
			setUsername={setUsername}
			header="Login"
			redirect="Sign Up"
		/>
	);
}
