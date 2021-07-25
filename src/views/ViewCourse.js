import axios from 'axios';
import { useEffect, useState } from 'react';
import { Grid, Image, Container, Header } from 'semantic-ui-react';
import { useParams, useHistory } from 'react-router-dom';

export default function ViewCourse(props) {
	let { id } = useParams();
	let history = useHistory();
	let course = props.allCourses.find((v) => v.id == id);
	if (course == undefined) {
		history.push('/');
	}
	let VideoLinkURL = course?.videoLink.map((v) => {
		let str = v.split('/');
		return str[str.length - 1];
	});
	let [video, selectVideo] = useState(VideoLinkURL?.[0]);
	const viewVideo = (v) => selectVideo(v);
	useEffect(async () => {
		try {
			let response = await axios.post('https://ea-backend-api.herokuapp.com/coursesBought', {
				user: sessionStorage.getItem('username'),
			});
		} catch (e) {
			history.push('/');
		}
	}, []);
	return (
		<Container style={{ marginTop: '7em', marginBottom: '50px' }}>
			<Header as="h1">Course Title: {course?.title}</Header>
			<Grid style={{ marginTop: '10px' }}>
				<Grid.Column width={4} style={{ height: '80vh', overflow: 'auto' }}>
					{VideoLinkURL?.map((v, index) => (
						<div style={{ paddingBottom: '10px', cursor: 'pointer' }}>
							<span style={{ fontWeight: 700 }}>Part {index + 1}</span>
							<Image
								onClick={() => viewVideo(v)}
								fluid
								src={`https://i.ytimg.com/vi/${v}/hqdefault.jpg`}
								size="large"
							/>
						</div>
					))}
				</Grid.Column>
				<Grid.Column width={12}>
					<div className="video-responsive">
						<iframe
							width="853"
							height="480"
							src={`https://www.youtube.com/embed/${video}`}
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							title="Embedded youtube"
						/>
					</div>
				</Grid.Column>
			</Grid>
		</Container>
	);
}
