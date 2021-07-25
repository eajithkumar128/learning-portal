import Login from '../components/Login';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function SignUpPage() {
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	let history = useHistory();

	async function signUp() {
		try {
			let response = await axios.post('https://ea-backend-api.herokuapp.com/register', {
				username: username,
				password: password,
			});
			history.push('/login');
		} catch (e) {}
	}

	return (
		<Login
			password={password}
			setPassword={setPassword}
			username={username}
			setUsername={setUsername}
			action={signUp}
			header="Sign Up"
			redirect="login"
		/>
	);
}
