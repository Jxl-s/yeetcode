import { PRIVATE_API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import axios from 'axios';

export async function load({ params }) {
	const validTabs = ['description', 'submissions'];
	const { problem_tab } = params;

	if (!validTabs.includes(problem_tab)) {
		throw error(404, 'Not Found');
	}

	// Fetch the available languages (is a local query)
	try {
		const res = await axios.get(PRIVATE_API_URL + '/languages');
		if (res.status === 200) {
			return {
				languages: res.data.data
			};
		}
	} catch (err) {
		console.log(err);

		// Return only python (for default)
		return {
			languages: {
				name: 'python3',
				display: 'Python3'
			}
		};
	}
}
