import { writable } from 'svelte/store';

export const editorStore = writable({
	language: 'python',

	/** @type {Record<string, string>} */
	defaults: {},
	code: ''
});

export function resetCode() {
	editorStore.update((editor) => {
		editor.code = editor.defaults[editor.language] ?? '';
		return editor;
	});
}

/**
 * @param {Record<string, string>} snippets
 */
export function setSnippets(snippets) {
	editorStore.update((editor) => {
		editor.defaults = snippets;
		return editor;
	});
}
