import './App.css';
import CourseCards from './components/courseCards';
import Navbar from './components/Navbar';
import MyCourses from './components/MyCourses';
import LoginPage from './views/LoginPage';
import SignUpPage from './views/SignUpPage';
import ViewCourse from './views/ViewCourse';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function About() {
	return <h1 style={{ marginTop: '55px' }}>About</h1>;
}

function App() {
	const [isAuthenticated, setAuthentication] = useState(false);
	const [allCourses, getAllCourses] = useState([]);
	return (
		<div>
			<Router>
				<Navbar isAuthenticated={isAuthenticated} />

				<div style={{ height: '100vh', overflow: 'scroll' }}>
					<Switch>
						<Route path="/signup">
							<SignUpPage />
						</Route>
						<Route path="/login">
							<LoginPage setAuthentication={setAuthentication} />
						</Route>
						<Route path="/viewCourse/:id">
							<ViewCourse allCourses={allCourses} />
						</Route>
						<Route path="/boughtCourses">
							<MyCourses />
						</Route>
						<Route path="/users">
							<About />
						</Route>
						<Route path="/">
							<CourseCards allCourses={allCourses} getAllCourses={getAllCourses} />
						</Route>
					</Switch>
				</div>
			</Router>
		</div>
	);
}

export default App;
