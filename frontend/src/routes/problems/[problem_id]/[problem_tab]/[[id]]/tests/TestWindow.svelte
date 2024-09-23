<script>
	import Button from '$lib/components/ui/button/button.svelte';

	import FileScan from 'lucide-svelte/icons/file-scan';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import SquareChevronRight from 'lucide-svelte/icons/square-chevron-right';
	import { resultStore, runnerStore, testFocusStore } from '$lib/stores/problem';
	import CaseTab from './CaseTab.svelte';
	import ResultsTab from './ResultsTab.svelte';
</script>

<section class="bg-primary-foreground w-full h-full flex flex-col rounded-md px-4 pb-4">
	<header class="sticky top-0 pt-4 pb-2 flex gap-2 bg-primary-foreground z-10">
		<Button
			variant={$testFocusStore === 'cases' ? 'default' : 'ghost'}
			class="flex items-center gap-2"
			on:click={() => testFocusStore.set('cases')}
		>
			<FileScan class="w-3 h-3" />
			Test Cases
		</Button>
		<Button
			variant={$testFocusStore === 'results' ? 'default' : 'ghost'}
			class="flex items-center gap-2"
			on:click={() => testFocusStore.set('results')}
			disabled={$runnerStore.running}
		>
			{#if $runnerStore.running}
				<LoaderCircle class="w-3 h-3 animate-spin" />
			{:else}
				<SquareChevronRight class="w-3 h-3" />
			{/if}
			Test Results
		</Button>
	</header>

	{#if $testFocusStore === 'cases'}
		<CaseTab />
	{:else if $testFocusStore === 'results'}
		{#if !$runnerStore.running}
			<ResultsTab />
		{/if}
	{/if}
</section>
