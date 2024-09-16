<script>
	import * as Select from '$lib/components/ui/select';
	import Monaco from '$lib/components/Monaco.svelte';
	import Button from '../ui/button/button.svelte';
	import RotateCcw from 'lucide-svelte/icons/rotate-ccw';
	import { editorStore, resetCode } from '$lib/stores/editor';

	/** @type {{value: string, label: string}[]} */
	export let languages = [
		{ value: 'python', label: 'Python3' },
		{ value: 'javascript', label: 'JavaScript' }
	];

	let selected = languages[0];
</script>

<header class="flex justify-between mb-2">
	<Select.Root bind:selected>
		<Select.Trigger class="w-[180px]">
			<Select.Value placeholder="Language" />
		</Select.Trigger>
		<Select.Content>
			{#each languages as language}
				<Select.Item value={language.value}>{language.label}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
	<Button variant="ghost" size="icon" on:click={resetCode}>
		<RotateCcw class="w-3 h-3 font-bold" />
	</Button>
</header>

<div class="flex-grow">
	<Monaco language={selected.value} bind:value={$editorStore.code} />
</div>
