import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, Icon, Image, Container, Header, Grid, Button } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import ViewCourse from '../views/ViewCourse';

export default function MyCourses() {
	let [courses, setCourses] = useState([]);
	let history = useHistory();

	useEffect(async () => {
		if (!sessionStorage.getItem('username')) {
			history.push('/login');
		}
		let response = await axios.post('https://ea-backend-api.herokuapp.com/coursesBought', {
			user: sessionStorage.getItem('username'),
		});
		setCourses(response.data.courses);
	}, []);

	const ViewCourse = (id) => history.push('/viewCourse/' + id);

	return (
		<Container style={{ marginTop: '7em' }}>
			<Grid doubling columns={3}>
				<Grid.Row>
					{courses.map((v) => (
						<Grid.Column>
							<Card style={{ marginBottom: '30px' }}>
								<Image
									centered
									fluid
									style={{ height: '200px', overflow: 'hidden' }}
									src={v.thumbnailURL}
									wrapped
									ui={false}
								/>
								<Card.Content>
									<Card.Header>{v.title}</Card.Header>
								</Card.Content>
								<Card.Content extra>
									<Button color="black" fluid size="large" onClick={() => ViewCourse(v.id)}>
										View Course
									</Button>
								</Card.Content>
							</Card>
						</Grid.Column>
					))}
				</Grid.Row>
			</Grid>
		</Container>
	);
}
