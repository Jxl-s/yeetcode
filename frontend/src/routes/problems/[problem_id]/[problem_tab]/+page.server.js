import { error } from '@sveltejs/kit';

export function load({ params }) {
	const validTabs = ['description', 'submissions'];
	const { problem_tab } = params;

	if (!validTabs.includes(problem_tab)) {
		throw error(404, 'Not Found');
	}
}
