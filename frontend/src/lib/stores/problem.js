import { writable } from 'svelte/store';
import { axiosInstance } from './auth';
import { setSnippets } from './editor';

/**
 * @type {import('svelte/store').Writable<{
 * 		problem: import('$lib/data/problems').Problem | null,
 * 		languages: {display: string, name: string}[],
 * 		submissions: import('$lib/data/submissions').Submission[],
 * 		testCases: Record<string, string>[]
 * }>}
 */
export const problemStore = writable({
	problem: null,
	languages: [],
	submissions: [],
	testCases: []
});

export function resetProblemStore() {
	problemStore.set({
		problem: null,
		languages: [],
		submissions: [],
		testCases: []
	});
}

/**
 * Fetches a problem by its ID
 * @param {string} problemId
 */
export async function fetchProblem(problemId) {
	try {
		const res = await axiosInstance.get(`/problems/${problemId}`);
		if (res.status !== 200) {
			throw new Error('Failed to fetch problem');
		}

		problemStore.update((store) => ({
			...store,
			problem: res.data.data,
			testCases: res.data.test_cases
		}));

		setSnippets(problemId, res.data.snippets);
	} catch (err) {
		console.log(err);
	}
}

/**
 * Fetches all submissions
 * @param {string} problemId
 */
export async function fetchSubmissions(problemId) {
	try {
		const res = await axiosInstance.get(`/problems/${problemId}/submissions`);
		if (res.status !== 200) {
			throw new Error('Failed to fetch submissions');
		}

		problemStore.update((store) => ({
			...store,
			submissions: res.data.data
		}));
	} catch (err) {
		console.log(err);
	}
}

export async function fetchLanguages() {
	try {
		const res = await axiosInstance.get('/languages');
		if (res.status !== 200) {
			throw new Error('Failed to fetch languages');
		}

		problemStore.update((store) => ({
			...store,
			languages: res.data.data
		}));
	} catch (err) {
		console.log(err);
	}
}
