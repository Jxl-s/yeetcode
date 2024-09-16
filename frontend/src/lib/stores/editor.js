import { writable } from 'svelte/store';

export const editorStore = writable({
	language: 'python',
	defaultCode: 'class Solution():\n\tdef __init__(self):\n\t\tpass',
	code: ''
});

export function resetCode() {
	editorStore.update((editor) => {
		editor.code = editor.defaultCode;
		return editor;
	});
}
