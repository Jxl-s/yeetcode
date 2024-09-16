import { writable } from 'svelte/store';

export const editorStore = writable({
	language: 'python',
	code: ''
});
