import { Card, Icon, Image, Container, Form, Header, Grid, Button, Modal, Message } from 'semantic-ui-react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CourseCards(props) {
	const history = useHistory();
	const [selectedCourse, setSelectedCourse] = useState({});
	const [open, setOpen] = React.useState(false);
	const [modal, setModal] = React.useState(false);
	const [errorMsg, setErrorMsg] = React.useState(false);
	const [cNum, setCNum] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');
	const [ccv, setCcv] = useState('');
	const [name, setName] = useState('');
	const [otp, setOtp] = useState('');

	useEffect(async () => {
		try {
			let response = await axios.get(
				'https://s3-ap-southeast-1.amazonaws.com/he-public-data/courses26269ff.json'
			);
			props.getAllCourses(response.data);
		} catch (e) {}
	}, []);

	const buyCourse = (courseDetails) => {
		if (!sessionStorage.getItem('username')) {
			history.push('/login');
		}
		setOpen(true);
		setSelectedCourse(courseDetails);
	};

	const makePurchase = async () => {
		if (otp != 12345) {
			alert('Otp verification failed, please input 12345 as otp to proceed');
			setModal(false);
			return;
		}
		let response = await axios.post('http://localhost:3001/buyCourse', {
			...selectedCourse,
			user: sessionStorage.getItem('username'),
		});
		alert('Course bought successfully');
		setModal(false);
	};

	const verifyPurchase = () => {
		if (!(cNum & month && year && ccv && name)) {
			setErrorMsg(1);
			return;
		}
		setOpen(false);
		setModal(true);
	};

	return (
		<Container style={{ marginTop: '7em', marginBottom: '50px' }}>
			<Modal size="tiny" closeIcon open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
				<Header icon="cc visa" content="Course Purchase" />

				<Modal.Content>
					{!errorMsg && (
						<Message error header="Information Required" content="Please fill in all the values." />
					)}
					<Form>
						<Form.Group>
							<Form.Input
								value={cNum}
								onChange={(e) => setCNum(e.target.value)}
								placeholder="Card Number"
								width={16}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Input
								value={month}
								onChange={(e) => setMonth(e.target.value)}
								required
								placeholder="Month"
								width={6}
							/>
							<Form.Input
								value={year}
								onChange={(e) => setYear(e.target.value)}
								placeholder="Year"
								width={6}
							/>
							<Form.Input
								value={ccv}
								onChange={(e) => setCcv(e.target.value)}
								placeholder="CCV"
								width={4}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="Name on card"
								width={16}
							/>
						</Form.Group>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<div style={{ float: 'left', fontWeight: '700' }}>PRICE: 449</div>
					<Button color="red" onClick={() => setOpen(false)}>
						<Icon name="remove" /> Cancel
					</Button>
					<Button
						color="green"
						onClick={() => {
							verifyPurchase();
						}}
					>
						<Icon name="checkmark" /> Buy
					</Button>
				</Modal.Actions>
			</Modal>
			<Modal size="tiny" closeIcon open={modal} onClose={() => setModal(false)} onOpen={() => setModal(true)}>
				<Header content="OTP Verification" />

				<Modal.Content>
					<Form>
						<Form.Group>
							<Form.Input
								value={otp}
								onChange={(e) => setOtp(e.target.value)}
								placeholder="OTP number"
								width={16}
							/>
						</Form.Group>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button color="red" onClick={() => setModal(false)}>
						<Icon name="remove" /> Cancel
					</Button>
					<Button color="green" onClick={() => makePurchase()}>
						<Icon name="checkmark" /> Confirm
					</Button>
				</Modal.Actions>
			</Modal>
			<Header as="h1">Courses:</Header>
			<Grid doubling columns={3}>
				<Grid.Row>
					{props.allCourses.map((v) => (
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
									<Card.Description>Price: {v.price}</Card.Description>
								</Card.Content>
								<Card.Content extra>
									<Button color="black" fluid size="large" onClick={() => buyCourse(v)}>
										Buy Now
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
