<script>
	import Play from 'lucide-svelte/icons/play';
	import CloudUpload from 'lucide-svelte/icons/cloud-upload';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';

	import Button from '../ui/button/button.svelte';
	import { runnerStore, runTestCases, submitCode } from '$lib/stores/problem';
	import { AuthState, authStore } from '$lib/stores/auth';

	$: signedIn = $authStore.state === AuthState.SignedIn;
</script>

<div
	class="flex-grow flex items-center justify-center gap-2 absolute left-0 right-0 pointer-events-none"
>
	{#if $runnerStore.running || $runnerStore.submitting}
		<div
			class="flex items-center justify-center gap-2 font-semibold text-xs opacity-50 absolute left-0 right-0 pointer-events-auto"
		>
			<LoaderCircle class="w-4 h-4 animate-spin" />
			Pending ...
		</div>
	{:else}
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild let:builder>
				<Button
					builders={!signedIn ? [builder] : undefined}
					variant="outline"
					class="flex items-center gap-2 font-semibold w-[120px] pointer-events-auto"
					on:click={signedIn ? runTestCases : undefined}
				>
					<Play class="w-4 h-4" />
					Run
				</Button>
				<Button
					builders={!signedIn ? [builder] : undefined}
					variant="outline"
					class="flex items-center gap-2 font-semibold text-green-500 w-[120px] pointer-events-auto"
					on:click={signedIn ? submitCode : undefined}
				>
					<CloudUpload class="w-4 h-4" />
					Submit
				</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Sign in to run your code</AlertDialog.Title>
					<AlertDialog.Description>
						Please sign in to run your code and view the test results.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Action>OK</AlertDialog.Action>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
	{/if}
</div>
