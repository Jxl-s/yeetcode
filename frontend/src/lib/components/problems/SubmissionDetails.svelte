<script>
	import Clock from 'lucide-svelte/icons/clock';
	import DatabaseZap from 'lucide-svelte/icons/memory-stick';
	import MoveLeft from 'lucide-svelte/icons/move-left';
	import Copy from 'lucide-svelte/icons/copy';

	import Button from '../ui/button/button.svelte';
	import { onMount } from 'svelte';
	import PythonIcon from '../icons/PythonIcon.svelte';
	import { axiosInstance } from '$lib/stores/auth';
	import AcceptedInfo from './AcceptedInfo.svelte';
	import { submissionColors, submissionStatus } from '$lib/data/submissions';
	import ErrorInfo from './ErrorInfo.svelte';

	/** @type {string} */
	export let problemId;
	const submissionsHref = `/problems/${problemId}/submissions`;

	/** @type {string} */
	export let submissionId;

	/** @type {import('$lib/data/submissions').Submission | null} */
	let submissionDetails = null;

	async function fetchSubmission() {
		try {
			const res = await axiosInstance.get(`/submissions/${submissionId}`);
			if (res.status !== 200) {
				throw new Error('Failed to fetch submission');
			}

			submissionDetails = res.data.data;
		} catch (err) {
			console.log(err);
		}
	}

	// Handle copying
	let copyStatus = false;
	function copySolution() {
		copyStatus = true;
		setTimeout(() => (copyStatus = false), 1000);
	}

	/** @type {HTMLElement}*/
	let codeBox;
	/** @type {import("monaco-editor")} */
	let Monaco;

	onMount(async () => {
		await fetchSubmission();

		// Load Monaco Editor
		Monaco = await import('monaco-editor');

		const code = submissionDetails?.code ?? '';
		let language = submissionDetails?.language ?? 'python';
		if (language == 'python3') language = 'python';

		// Apply syntax highlighting to the div element
		const html = await Monaco.editor.colorize(code, language, {});
		codeBox.innerHTML = html;
	});
</script>

<div class="w-full h-full">
	<a
		class="text-muted-foreground flex gap-2 items-center hover:underline text-sm"
		href={submissionsHref}
	>
		<MoveLeft class="w-3 h-3" />
		Back to Submissions
	</a>
	{#if submissionDetails}
		<div class="px-4 mt-4">
			<header class="flex justify-between">
				<div>
					<header class="flex gap-4 items-center">
						<span class="font-semibold text-lg {submissionColors[submissionDetails.status]}">
							{submissionStatus[submissionDetails.status]}</span
						>
						<span class="text-xs text-muted-foreground/50"
							>{submissionDetails.passed} / 120 testcases passed</span
						>
					</header>
					<span class="text-xs text-muted-foreground block mt-1">
						<!-- You submitted at Sep 14, 2024 12:20 -->
						You submitted at {new Date(submissionDetails.created_at).toLocaleDateString('en-US', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric'
						})}
					</span>
				</div>
				<div>
					<Button variant="secondary" on:click={copySolution} disabled={copyStatus}>
						<Copy class="w-3 h-3 mr-3" />
						{#if copyStatus}
							Copied!
						{:else}
							Copy Solution
						{/if}
					</Button>
				</div>
			</header>
			{#if submissionDetails.status === 'ACCEPTED'}
				<AcceptedInfo
					class="w-full mt-4"
					runtime={submissionDetails.runtime}
					memory={submissionDetails.memory}
				/>
			{:else if submissionDetails.status === 'WRONG_ANSWER'}
				<div class="w-full mt-4 flex flex-col gap-6">
					<div>
						<span class="block text-xs font-semibold text-muted-foreground">Input</span>
						<code class="text-sm">[0,0,0,0]</code>
					</div>
					<div>
						<span class="block text-xs font-semibold text-muted-foreground">Output</span>
						<code class="text-sm">[[0,0,0,0], [0,0,0,0]]</code>
					</div>
					<div>
						<span class="block text-xs font-semibold text-muted-foreground">Expected</span>
						<code class="text-sm">[[0,0,0]]</code>
					</div>
				</div>
			{:else}
				<ErrorInfo class="w-full mt-4" error={submissionDetails.error ?? ''} />
			{/if}

			<!-- Code section -->
			<div class="mt-8 text-sm opacity-50">
				<span class="font-semibold flex gap-2 items-center">
					<PythonIcon class="w-3 h-3" />
					Python3
				</span>
			</div>
			<section class="w-full bg-[#141414] rounded-md mt-2 relative">
				<div class="overflow-scroll p-4">
					<code class="text-xs text-nowrap" bind:this={codeBox} />
				</div>
			</section>
		</div>
	{/if}
</div>
