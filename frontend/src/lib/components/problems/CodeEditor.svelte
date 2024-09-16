<script>
	import * as Select from '$lib/components/ui/select';
	import Monaco from '$lib/components/Monaco.svelte';

	let language = { value: 'python', label: 'Python3' };
	let code = 'class Solution():\n\tdef __init__(self):\n\t\tpass';
</script>

<header>
	<Select.Root bind:selected={language}>
		<Select.Trigger class="w-[180px]">
			<Select.Value placeholder="Language" />
		</Select.Trigger>
		<Select.Content>
			<Select.Item
				value="python"
				on:click={() => {
					code = 'class Solution():\n\tdef __init__(self):\n\t\tpass';
				}}
			>
				Python3
			</Select.Item>
			<Select.Item
				value="javascript"
				on:click={() => {
					code = 'class Solution {\n\tconstructor() {\n\t\t// code here\n\t}\n}';
				}}
			>
				JavaScript
			</Select.Item>
		</Select.Content>
	</Select.Root>
</header>

<div class="flex-grow mt-2">
	<Monaco language={language.value} value={code} />
</div>
