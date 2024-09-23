<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { addTest, problemStore, updateTest } from '$lib/stores/problem';

	let selectedCase = 0;

	/** @type {Record<string, string>[]} */
	$: testCases = $problemStore.testCases;
</script>

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
		{#if testCases.length < 5}
			<Button class="flex gap-4 items-center" on:click={() => (selectedCase = addTest())}>
				Add Case
			</Button>
		{/if}
	</div>

	<div class="flex-grow mt-2 pb-2 flex flex-col gap-4 overflow-auto">
		{#if testCases[selectedCase]}
			{@const input = testCases[selectedCase]}
			{#each Object.entries(input) as [key, value]}
				<div class="px-1">
					<span class="text-xs opacity-50 font-semibold">{key} =</span>
					<input
						class="rounded-md border mt-1 p-2 text-sm w-full block bg-transparent font-mono"
						on:input={(e) => {
							const target = /** @type {HTMLInputElement} */ (e.target);
							updateTest(selectedCase, key, target.value);
						}}
						{value}
					/>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.auto-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, 100px);
	}
</style>
