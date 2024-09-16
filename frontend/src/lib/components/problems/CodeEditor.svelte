<script>
	import * as Select from '$lib/components/ui/select';
	import Monaco from '$lib/components/Monaco.svelte';

	/** @type {{value: string, label: string}[]} */
	export let languages = [
		{ value: 'python', label: 'Python3' },
		{ value: 'javascript', label: 'JavaScript' }
	];

	let selected = languages[0];
	let code = 'class Solution():\n\tdef __init__(self):\n\t\tpass';
</script>

<header>
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
</header>

<div class="flex-grow mt-2">
	<Monaco language={selected.value} bind:value={code} />
</div>
