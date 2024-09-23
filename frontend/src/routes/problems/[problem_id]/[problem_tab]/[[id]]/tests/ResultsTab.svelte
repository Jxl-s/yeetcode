<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { problemStore, resultStore, updateTest } from '$lib/stores/problem';

	import CircleCheck from 'lucide-svelte/icons/circle-check';
	import CircleX from 'lucide-svelte/icons/circle-x';

	let selectedCase = 0;
</script>

<div class="flex-grow mt-2 mx-2 flex flex-col h-0 overflow-hidden">
	{#if $resultStore.stderr}
		<div class="w-full bg-red-950 px-4 py-2 rounded-md">
			<code class="text-red-300 rounded-lg text-xs">
				{$resultStore.stderr}
			</code>
		</div>
	{:else}
		<div class="grid gap-4 auto-grid py-1">
			{#each $resultStore.correct as val, i}
				<Button
					variant="ghost"
					class="flex gap-2 {selectedCase == i ? '' : 'opacity-50'} {val
						? 'text-green-500'
						: 'text-red-500'}"
					on:click={() => (selectedCase = i)}
				>
					{#if val}
						<CircleCheck class="w-3 h-3 text-green-500" />
					{:else}
						<CircleX class="w-6 h-6 text-red-500" />
					{/if}
					Case {i + 1}
				</Button>
			{/each}
		</div>

		<div class="flex-grow mt-2 pb-2 overflow-auto">
			{#if $resultStore.correct[selectedCase] !== undefined}
				{@const input = $resultStore.inputs[selectedCase]}
				<span class="text-sm mb-2 font-semibold block opacity-50">Input</span>
				<div class="flex flex-col gap-4">
					{#each Object.entries(input) as [key, value]}
						<div class="px-2">
							<span class="text-xs opacity-50 font-semibold">{key} =</span>
							<div class="rounded-md border mt-1 p-2 text-sm w-full block bg-transparent font-mono">
								{value}
							</div>
						</div>
					{/each}
				</div>
				{#if $resultStore.stdout[selectedCase]}
					<span class="text-sm mb-2 font-semibold mt-4 block opacity-50">Stdout</span>
					<div class="px-2 mt-2">
						<div class="rounded-md border mt-1 p-2 text-sm w-full block bg-transparent font-mono whitespace-pre-wrap">
							{$resultStore.stdout[selectedCase]}
						</div>
					</div>
				{/if}
				<span class="text-sm mb-2 font-semibold mt-4 block opacity-50">Output</span>
				<div class="px-2 mt-2">
					<div class="rounded-md border mt-1 p-2 text-sm w-full block bg-transparent font-mono">
						{$resultStore.results[selectedCase]}
					</div>
				</div>
				<span class="text-sm mb-2 font-semibold mt-4 block opacity-50">Expected</span>
				<div class="px-2 mt-2">
					<div class="rounded-md border mt-1 p-2 text-sm w-full block bg-transparent font-mono">
						{$resultStore.expected[selectedCase]}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.auto-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, 100px);
	}
</style>
