<script lang="ts">
	import type monaco from 'monaco-editor';
	import { onMount } from 'svelte';
	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	let divEl: HTMLDivElement = null;
	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;

	onMount(async () => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
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
				'editor.background': '#00000000',
				focusBorder: '#00000000'
			}
		});

		editor = Monaco.editor.create(divEl, {
			value: ['class Solution:', '\tdef __init__(self):', '\t\tpass'].join('\n'),
			language: 'python',
			theme: 'no-background',
			minimap: {
				enabled: false
			}
		});

		return () => {
			editor.dispose();
		};
	});
</script>

<div bind:this={divEl} class="w-full h-full rounded-md overflow-hidden" />
