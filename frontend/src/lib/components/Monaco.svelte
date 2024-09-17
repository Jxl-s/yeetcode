<script lang="js">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	export let value = '';
	export let language = 'python3';

	/** @type {HTMLDivElement} */
	let divEl;

	/** @type {import("monaco-editor").editor.IStandaloneCodeEditor} */
	let editor;

	/** @type {import("monaco-editor")} */
	let Monaco;
	const dispatch = createEventDispatcher();

	async function monacoInit() {
		self.MonacoEnvironment = {
			getWorker: function (_moduleId, label) {
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}

				return new editorWorker();
			}
		};

		Monaco = await import('monaco-editor');
		Monaco.editor.defineTheme('no-background', {
			base: 'vs-dark',
			inherit: true,
			rules: [],
			colors: {
				'editor.background': '#141414',
				focusBorder: '#00000000'
			}
		});

		editor = Monaco.editor.create(divEl, {
			value: value,
			theme: 'no-background',
			minimap: {
				enabled: false
			},
			automaticLayout: true,
			padding: {
				top: 16
			}
		});

		editor.onDidChangeModelContent(() => {
			value = editor.getValue();
		});
	}

	onMount(() => {
		monacoInit();
		return () => editor?.dispose();
	});

	$: if (editor) {
		if (editor.getValue() !== value) {
			editor.setValue(value);
		}

		const model = editor.getModel();
		if (model) {
			let editorLanguage = language;
			if (editorLanguage === 'python3') {
				editorLanguage = 'python';
			}

			Monaco.editor.setModelLanguage(model, editorLanguage);
		}
	}
</script>

<div bind:this={divEl} class="w-full h-full rounded-md overflow-hidden" />
