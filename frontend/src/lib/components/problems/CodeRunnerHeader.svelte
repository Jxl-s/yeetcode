<script>
	import Play from 'lucide-svelte/icons/play';
	import CloudUpload from 'lucide-svelte/icons/cloud-upload';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import Button from '../ui/button/button.svelte';
	import { runnerStore, runTestCases, submitCode } from '$lib/stores/problem';
</script>

<div class="flex-grow flex items-center justify-center gap-2 absolute left-0 right-0">
	{#if $runnerStore.running || $runnerStore.submitting}
		<div
			class="flex items-center justify-center gap-2 font-semibold text-xs opacity-50 absolute left-0 right-0"
		>
			<LoaderCircle class="w-4 h-4 animate-spin" />
			Pending ...
		</div>
	{:else}
		<Button
			variant="outline"
			class="flex items-center gap-2 font-semibold w-[120px]"
			on:click={runTestCases}
		>
			<Play class="w-4 h-4" />
			Run
		</Button>
		<Button
			variant="outline"
			class="flex items-center gap-2 font-semibold text-green-500 w-[120px]"
			on:click={submitCode}
		>
			<CloudUpload class="w-4 h-4" />
			Submit
		</Button>
	{/if}
</div>
