import { writable } from 'svelte/store';

export const editorStore = writable({
	questionId: '',
	language: 'python',

	/** @type {Record<string, string>} */
	defaults: {},
	code: ''
});

editorStore.subscribe(
	(editor) => {
		if (!editor.questionId || !editor.code) return;
		const key = `editor-${editor.questionId}-${editor.language}`;
		localStorage.setItem(key, editor.code);
	},
	(val) => val?.code
);

export function resetCode(hard = false) {
	editorStore.update((editor) => {
		if (hard) {
			editor.questionId = '';
			editor.code = '';
		} else {
			editor.code = editor.defaults[editor.language] ?? '';
		}

		return editor;
	});
}

/**
 * Switches the language of the editor
 * @param {string} language
 */
export function switchLanguage(language) {
	editorStore.update((editor) => {
		editor.language = language;
		editor.code = editor.defaults[language] ?? '';

		const key = `editor-${editor.questionId}-${editor.language}`;
		const data = localStorage.getItem(key);

		if (data) {
			editor.code = data;
		} else {
			editor.code = editor.defaults[editor.language] ?? '';
		}

		return editor;
	});
}

/**
 * @param {string} questionId
 * @param {Record<string, string>} snippets
 */
export function setSnippets(questionId, snippets) {
	editorStore.update((editor) => {
		editor.questionId = questionId;
		editor.defaults = snippets;

		// Load the code from storage
		const key = `editor-${editor.questionId}-${editor.language}`;
		const data = localStorage.getItem(key);

		if (data) {
			editor.code = data;
		} else {
			editor.code = editor.defaults[editor.language] ?? '';
		}

		return editor;
	});
}
