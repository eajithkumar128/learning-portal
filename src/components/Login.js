import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Login(props) {
	let history = useHistory();
	return (
		<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" color="black" textAlign="center">
					{props.header} to your account
				</Header>
				<Form size="large">
					<Segment stacked>
						<Form.Input
							fluid
							icon="user"
							value={props.username}
							iconPosition="left"
							placeholder="Username"
							onChange={(e) => props.setUsername(e.target.value)}
						/>
						<Form.Input
							fluid
							icon="lock"
							value={props.password}
							iconPosition="left"
							placeholder="Password"
							type="password"
							onChange={(e) => props.setPassword(e.target.value)}
						/>

						<Button color="black" fluid size="large" onClick={props.action}>
							{props.header}
						</Button>
					</Segment>
				</Form>
				<Message>
					{props.header === 'Login' ? 'New to us? ' : 'Already have account? '}
					<Link to={props.redirect.toLowerCase().replace(' ', '')}>{props.redirect}</Link>
				</Message>
			</Grid.Column>
		</Grid>
	);
}
