<script>
	import * as Resizable from '$lib/components/ui/resizable';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import { page } from '$app/stores';
	import ProblemDescription from '$lib/components/problems/ProblemDescription.svelte';
	import CodeEditor from '$lib/components/problems/CodeEditor.svelte';
	import ProblemDescriptionFooter from '$lib/components/problems/ProblemDescriptionFooter.svelte';
	import SubmissionsList from '$lib/components/problems/SubmissionsList.svelte';
	import { onDestroy, onMount } from 'svelte';
	import ProblemHeader from '$lib/components/problems/ProblemHeader.svelte';
	import SubmissionDetails from '$lib/components/problems/SubmissionDetails.svelte';
	import TestWindow from './tests/TestWindow.svelte';
	import {
		fetchLanguages,
		fetchProblem,
		fetchSubmissions,
		problemStore,
		resetProblemStore,
		resetResultsStore
	} from '$lib/stores/problem';

	onMount(() => {
		fetchLanguages();
		fetchProblem($page.params.problem_id);
		fetchSubmissions($page.params.problem_id);
	});

	onDestroy(() => {
		resetProblemStore();
		resetResultsStore();
	});
</script>

<Resizable.PaneGroup direction="horizontal">
	<Resizable.Pane defaultSize={50} class="pe-2 h-full">
		<section class="bg-primary-foreground w-full h-full flex flex-col rounded-md px-4 pb-4">
			<ProblemHeader
				class="pt-4 pb-2"
				problemId={$page.params.problem_id}
				tab={$page.params.problem_tab}
			/>
			{#if $page.params.problem_tab === 'description'}
				<div class="flex-grow overflow-auto px-2 mt-2 pb-4 pe-8">
					<ProblemDescription />
				</div>
				<ProblemDescriptionFooter />
			{:else if $page.params.problem_tab === 'submissions'}
				<div class="flex-grow overflow-auto px-2 pe-8">
					{#if $page.params.id !== undefined}
						<SubmissionDetails problemId={$page.params.problem_id} submissionId={$page.params.id} />
					{:else}
						<SubmissionsList />
					{/if}
				</div>
			{/if}
		</section>
	</Resizable.Pane>
	<Resizable.Handle class="opacity-0 hover:opacity-100 bg-blue-500 duration-300" withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical" class="h-full">
			<Resizable.Pane defaultSize={50} class="ps-2 pb-2">
				<div class="bg-primary-foreground w-full h-full rounded-md p-2 flex flex-col">
					{#if $problemStore.languages.length > 0}
						<CodeEditor
							languages={$problemStore.languages.map((lang) => ({
								label: lang.display,
								value: lang.name
							}))}
						/>
					{:else}
						<div class="w-full h-full flex items-center justify-center">
							<LoaderCircle class="mr-2 w-1/2 h-1/2 animate-spin opacity-20" />
						</div>
					{/if}
				</div>
			</Resizable.Pane>
			<Resizable.Handle class="opacity-0 hover:opacity-100 bg-blue-500 duration-300" withHandle />
			<Resizable.Pane defaultSize={50} class="pt-2 ps-2">
				<TestWindow />
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
