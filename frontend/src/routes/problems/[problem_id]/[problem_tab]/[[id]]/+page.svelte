<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Resizable from '$lib/components/ui/resizable';

	import NotebookText from 'lucide-svelte/icons/notebook-text';
	import FileJson from 'lucide-svelte/icons/file-json';
	import FileScan from 'lucide-svelte/icons/file-scan';
	import SquareChevronRight from 'lucide-svelte/icons/square-chevron-right';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import { page } from '$app/stores';
	import { axiosInstance } from '$lib/stores/auth';
	import ProblemDescription from '$lib/components/problems/ProblemDescription.svelte';
	import CodeEditor from '$lib/components/problems/CodeEditor.svelte';
	import ProblemDescriptionFooter from '$lib/components/problems/ProblemDescriptionFooter.svelte';
	import { setSnippets } from '$lib/stores/editor';
	import SubmissionsList from '$lib/components/problems/SubmissionsList.svelte';
	import { onMount } from 'svelte';

	/** @type {import('$lib/data/problems').Problem | null} */
	let problem = null;

	/** @type {{name: string, display: string}[]} */
	let languages = [];

	/** @type {import('$lib/data/submissions').ListedSubmission[]} */
	let submissions = [];

	async function fetchProblem() {
		try {
			const res = await axiosInstance.get(`/problems/${$page.params.problem_id}`);
			if (res.status !== 200) {
				throw new Error('Failed to fetch problem');
			}

			problem = res.data.data;
			setSnippets($page.params.problem_id, res.data.snippets);
		} catch (err) {
			console.log(err);
		}
	}

	async function fetchLanguages() {
		try {
			const res = await axiosInstance.get('/languages');
			if (res.status !== 200) {
				throw new Error('Failed to fetch languages');
			}

			languages = res.data.data;
		} catch (err) {
			console.log(err);
		}
	}

	async function fetchSubmissions() {
		try {
			const res = await axiosInstance.get(`/problems/${$page.params.problem_id}/submissions`);
			if (res.status !== 200) {
				throw new Error('Failed to fetch submissions');
			}

			submissions = res.data.data;
		} catch (err) {
			console.log(err);
		}
	}

	function descriptionHref() {
		return `/problems/${$page.params.problem_id}/description`;
	}

	function submissionsHref() {
		return `/problems/${$page.params.problem_id}/submissions`;
	}

	onMount(() => {
		fetchLanguages();
		fetchProblem();
		fetchSubmissions();
	});
</script>

<Resizable.PaneGroup direction="horizontal">
	<Resizable.Pane defaultSize={50} class="pe-2 h-full">
		<section class="bg-primary-foreground w-full h-full flex flex-col rounded-md px-4 pb-4">
			<header class="sticky top-0 pt-4 pb-2 flex gap-2 bg-primary-foreground z-10">
				<Button
					variant={$page.params.problem_tab === 'description' ? 'default' : 'ghost'}
					class="flex items-center gap-2"
					href={descriptionHref()}
				>
					<NotebookText class="w-3 h-3" />
					Description
				</Button>
				<Button
					variant={$page.params.problem_tab === 'submissions' ? 'default' : 'ghost'}
					class="flex items-center gap-2"
					href={submissionsHref()}
				>
					<FileJson class="w-3 h-3" />
					Submissions
				</Button>
			</header>
			{#if $page.params.problem_tab === 'description'}
				<div class="flex-grow overflow-auto px-2 mt-2 pb-4 pe-8">
					<ProblemDescription {problem} />
				</div>
				<ProblemDescriptionFooter {problem} />
			{:else if $page.params.problem_tab === 'submissions'}
				<div class="flex-grow overflow-auto px-2 pe-8">
					{#if $page.params.id !== undefined}
						<p>some page here</p>
					{:else}
						<SubmissionsList {submissions} />
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
					{#if languages.length > 0}
						<CodeEditor
							languages={languages.map((lang) => ({
								value: lang.name,
								label: lang.display
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
				<section class="bg-primary-foreground w-full h-full flex flex-col rounded-md px-4 pb-4">
					<header class="sticky top-0 pt-4 pb-2 flex gap-2 bg-primary-foreground z-10">
						<Button variant="ghost" class="flex items-center gap-2">
							<FileScan class="w-3 h-3" />
							Test Cases
						</Button>
						<Button variant="ghost" class="flex items-center gap-2">
							<SquareChevronRight class="w-3 h-3" />
							Test Results
						</Button>
					</header>
					<div class="flex-grow">
						<!-- <Monaco /> -->
					</div>
				</section>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
