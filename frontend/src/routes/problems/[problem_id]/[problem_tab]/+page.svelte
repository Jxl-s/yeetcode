<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import NotebookText from 'lucide-svelte/icons/notebook-text';
	import FileJson from 'lucide-svelte/icons/file-json';
	import { page } from '$app/stores';
	import { axiosInstance } from '$lib/stores/auth';
	import ProblemDescription from '$lib/components/problems/ProblemDescription.svelte';

	/** @type {import('$lib/data/problems').Problem | null} */
	let problem = null;

	async function fetchProblem() {
		try {
			const res = await axiosInstance.get(`/problems/${$page.params.problem_id}`);
			if (res.status !== 200) {
				throw new Error('Failed to fetch problem');
			}

			problem = res.data.data;
		} catch (err) {
			console.log(err);
		}
	}

	fetchProblem();
</script>

<Resizable.PaneGroup direction="horizontal">
	<Resizable.Pane defaultSize={50} class="pe-2">
		<section class="bg-primary-foreground w-full h-full rounded-md px-4 pb-4 overflow-auto">
			<header class="py-4 flex gap-2">
				<Button
					variant={$page.params.problem_tab === 'description' ? 'default' : 'ghost'}
					class="flex items-center gap-2"
					href="description"
				>
					<NotebookText class="w-3 h-3" />
					Description
				</Button>
				<Button
					variant={$page.params.problem_tab === 'submissions' ? 'default' : 'ghost'}
					class="flex items-center gap-2"
					href="submissions"
				>
					<FileJson class="w-3 h-3" />
					Submissions
				</Button>
			</header>
			<ProblemDescription {problem} />
		</section>
	</Resizable.Pane>
	<Resizable.Handle class="opacity-0 hover:opacity-100 bg-blue-500 duration-300" withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical" class="h-full">
			<Resizable.Pane defaultSize={50} class="ps-2 pb-2">
				<div class="bg-primary-foreground w-full h-full rounded-md"></div>
			</Resizable.Pane>
			<Resizable.Handle class="opacity-0 hover:opacity-100 bg-blue-500 duration-300" withHandle />
			<Resizable.Pane defaultSize={50} class="pt-2 ps-2">
				<div class="bg-primary-foreground w-full h-full rounded-md"></div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
