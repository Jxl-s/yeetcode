<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import X from 'lucide-svelte/icons/x';

	import FileScan from 'lucide-svelte/icons/file-scan';
	import SquareChevronRight from 'lucide-svelte/icons/square-chevron-right';

	let selectedCase = 0;

	/** @type {Record<string, string>[]} */
	export let testCases;
</script>

<section class="bg-primary-foreground w-full h-full flex flex-col rounded-md px-4 pb-4">
	<header class="sticky top-0 pt-4 pb-2 flex gap-2 bg-primary-foreground z-10">
		<Button variant="default" class="flex items-center gap-2">
			<FileScan class="w-3 h-3" />
			Test Cases
		</Button>
		<Button variant="ghost" class="flex items-center gap-2">
			<SquareChevronRight class="w-3 h-3" />
			Test Results
		</Button>
	</header>

	<div class="flex-grow mt-2 mx-2 flex flex-col h-0 overflow-hidden">
		<div class="grid gap-4 auto-grid py-1">
			{#each testCases as _, i}
				<Button
					variant="ghost"
					class="relative {selectedCase == i ? '' : 'opacity-50'}"
					on:click={() => (selectedCase = i)}
				>
					Case {i + 1}
					<!-- <span class="absolute -top-1 -right-1 rounded-full p-0.5">
						<X class="w-3 h-3 text-red-500" />
					</span> -->
				</Button>
			{/each}
		</div>

		<div class="flex-grow mt-2 pb-2 flex flex-col gap-4 overflow-auto">
			{#if testCases[selectedCase]}
				{@const input = testCases[selectedCase]}
				{#each Object.entries(input) as [key, value]}
					<div class="px-1">
						<span class="text-xs opacity-50 font-semibold">{key} =</span>
						<input
							class="rounded-md border mt-1 p-2 text-sm w-full block bg-transparent font-mono"
							{value}
						/>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</section>

<style>
	.auto-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, 100px);
	}
</style>
