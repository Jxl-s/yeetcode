import { get, writable } from 'svelte/store';
import { axiosInstance } from './auth';
import { editorStore, setSnippets } from './editor';

/**
 * @type {import('svelte/store').Writable<{
 * 		problem: import('$lib/data/problems').Problem | null,
 * 		languages: {display: string, name: string}[],
 * 		submissions: import('$lib/data/submissions').Submission[],
 * 		testCases: Record<string, string>[],
 * 		testCaseKeys: string[]
 * }>}
 */
export const problemStore = writable({
	problem: null,
	languages: [],
	submissions: [],
	testCases: [],
	testCaseKeys: []
});

export const runnerStore = writable({
	running: false,
	submitting: false
});

export function resetProblemStore() {
	problemStore.set({
		problem: null,
		languages: [],
		submissions: [],
		testCases: [],
		testCaseKeys: []
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
			testCases: res.data.test_cases,
			testCaseKeys: Object.keys(res.data.test_cases[0])
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

export function addTest() {
	problemStore.update((store) => ({
		...store,
		testCases: [...store.testCases, Object.fromEntries(store.testCaseKeys.map((key) => [key, '']))]
	}));

	return get(problemStore).testCases.length - 1;
}

/**
 * Removes a test case
 * @param {number} i Test number
 */
export function removeTest(i) {
	problemStore.update((store) => ({
		...store,
		testCases: store.testCases.filter((_, index) => index !== i)
	}));
}

/**
 *
 * @param {number} i Test number
 * @param {string} key Arg name
 * @param {string} value Arg value
 */
export function updateTest(i, key, value) {
	problemStore.update((store) => {
		// Modify the test case
		const testCases = [...store.testCases];
		testCases[i] = {
			...testCases[i],
			[key]: value
		};

		return {
			...store,
			testCases
		};
	});
}

/**
 * Runs the code in the editor and evaluates the test cases
 */
export async function runTestCases() {
	runnerStore.update((store) => ({
		...store,
		running: true
	}));
}

export async function submitCode() {
	runnerStore.update((store) => ({
		...store,
		submitting: true
	}));
}
