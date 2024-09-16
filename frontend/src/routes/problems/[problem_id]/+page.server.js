import { redirect } from '@sveltejs/kit';

export function load({ url }) {
	const newUrl = `${url.pathname}/description${url.search}`;
	throw redirect(302, newUrl);
}
