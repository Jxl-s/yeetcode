<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Resizable from '$lib/components/ui/resizable';

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
	import ProblemHeader from '$lib/components/problems/ProblemHeader.svelte';

	import Clock from 'lucide-svelte/icons/clock';
	import DatabaseZap from 'lucide-svelte/icons/memory-stick';
	import MoveLeft from 'lucide-svelte/icons/move-left';
	import Copy from 'lucide-svelte/icons/copy';

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

	onMount(() => {
		fetchLanguages();
		fetchProblem();
		fetchSubmissions();
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
					<ProblemDescription {problem} />
				</div>
				<ProblemDescriptionFooter {problem} />
			{:else if $page.params.problem_tab === 'submissions'}
				<div class="flex-grow overflow-auto px-2 pe-8">
					{#if $page.params.id !== undefined}
						<div class="w-full h-full">
							<a
								class="text-muted-foreground flex gap-2 items-center hover:underline text-sm"
								href={`/problems/${$page.params.problem_id}/submissions`}
							>
								<MoveLeft class="w-3 h-3" />
								Back to Submissions
							</a>
							<div class="px-4 mt-4">
								<header class="flex justify-between">
									<div>
										<span class="font-semibold text-green-500 block">Accepted</span>
										<span class="text-xs text-muted-foreground block"
											>You submitted at Sep 14, 2024 12:20</span
										>
									</div>
									<div>
										<Button variant="secondary">
											<Copy class="w-3 h-3 mr-3" />
											Copy Solution
										</Button>
									</div>
								</header>
								<section class="w-full flex px-3 mt-4">
									<div class="w-full">
										<span class="font-semibold flex items-center gap-2">
											<Clock class="w-3 h-3" />
											Runtime
										</span>
										<span class="font-medium">1100</span>
										<span class="text-sm text-muted-foreground">ms</span>
									</div>
									<div class="w-full">
										<span class="font-semibold flex items-center gap-2">
											<DatabaseZap class="w-3 h-3" />
											Memory
										</span>
										<span class="font-medium">82.2</span>
										<span class="text-sm text-muted-foreground">MB</span>
									</div>
								</section>
							</div>
						</div>
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
