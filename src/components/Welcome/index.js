import React, { useEffect, useState } from 'react'
import Axios from 'axios';

const Welcome = () => {

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false)

	const fetchPosts = async () => {
		setLoading(true);
		await Axios.get('https://jsonplaceholder.typicode.com/todos')
			.then(res => {
				setPosts(res.data);
				setLoading(false);
			});
	}

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			{
				loading
					? <div> Loading... </div>
					: <table>
						<thead>
							<tr>
								<th width={100} align="left">User ID</th>
								<th width={100} align="left">ID</th>
								<th>Title</th>
								<th>Is Completed</th>
							</tr>
						</thead>
						<tbody>
							{
								posts.map((obj, index) =>
									<tr key={index}>
										<td width={100}>{obj.userId}</td><td width={100}>{obj.id}</td><td>{obj.title}</td><td>{obj.completed ? "true" : "false"}</td>
									</tr>
								)
							}
						</tbody>
					</table>

			}
		</div>
	)
}

export default Welcome
