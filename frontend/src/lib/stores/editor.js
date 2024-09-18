import { writable } from 'svelte/store';

export const editorStore = writable({
	questionId: '',
	language: 'python3',

	/** @type {Record<string, string>} */
	defaults: {},
	code: ''
});

editorStore.subscribe(
	(editor) => {
		// Make sure the code is not empty
		if (!editor.questionId || !editor.code) return;
		const key = `editor-${editor.questionId}-${editor.language}`;

		// Don't save default code
		if (editor.code.trim() === editor.defaults[editor.language].trim()) {
			localStorage.removeItem(key);
			return;
		}

		localStorage.setItem(key, editor.code);
	},
	(val) => val?.code
);

/**
 * Fetches code stored from the local storage
 * @param {{questionId: string, language: string, defaults: Record<string, string>}} editor
 */
function getLocalCode(editor) {
	const key = `editor-${editor.questionId}-${editor.language}`;
	const data = localStorage.getItem(key);

	if (data) {
		return data;
	} else {
		return editor.defaults[editor.language] ?? '';
	}
}

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
		editor.code = getLocalCode(editor);

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
		editor.code = getLocalCode(editor);

		return editor;
	});
}
