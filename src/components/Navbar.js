import { Container, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
	return (
		<Menu fixed="top" inverted>
			<Container>
				<Menu.Item header style={{ 'font-size': '20px' }}>
					LEARNING PORTAL
				</Menu.Item>
				<Link to="/" style={{ marginTop: '10px' }}>
					<Menu.Item as="a">Home</Menu.Item>
				</Link>
				<Link to="/boughtCourses" style={{ marginTop: '10px' }}>
					<Menu.Item as="a">Bought Course</Menu.Item>
				</Link>

				{sessionStorage.getItem('username') ? (
					<Menu.Menu position="right">
						<Menu.Item>Hai {window.sessionStorage.getItem('username')}</Menu.Item>
						<Menu.Item name="logout" onClick={() => console.log('')} />
					</Menu.Menu>
				) : (
					<Menu.Menu position="right">
						<Menu.Item>
							<Link to="/login">Login</Link>
						</Menu.Item>
					</Menu.Menu>
				)}
			</Container>
		</Menu>
	);
}
