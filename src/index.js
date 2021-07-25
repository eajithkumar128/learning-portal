import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

axios.interceptors.request.use(
	(req) => {
		req.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token');
		return req;
	},
	(err) => {
		return Promise.reject(err);
	}
);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
