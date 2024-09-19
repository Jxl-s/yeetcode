<script>
	import Clock from 'lucide-svelte/icons/clock';
	import DatabaseZap from 'lucide-svelte/icons/memory-stick';
	import MoveLeft from 'lucide-svelte/icons/move-left';
	import Copy from 'lucide-svelte/icons/copy';

	import Button from '../ui/button/button.svelte';
	import { onMount } from 'svelte';
	import PythonIcon from '../icons/PythonIcon.svelte';
	import { axiosInstance } from '$lib/stores/auth';

	/** @type {string} */
	export let problemId;
	const submissionsHref = `/problems/${problemId}/submissions`;

	/** @type {number} */
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
					<span class="font-semibold text-green-500 block">Accepted</span>
					<span class="text-xs text-muted-foreground block">
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
			<section class="w-full flex mt-4">
				<div class="w-full">
					<span class="font-semibold flex items-center gap-2">
						<Clock class="w-3 h-3" />
						Runtime
					</span>
					<span class="font-medium">{submissionDetails.runtime}</span>
					<span class="text-sm text-muted-foreground">ms</span>
				</div>
				<div class="w-full">
					<span class="font-semibold flex items-center gap-2">
						<DatabaseZap class="w-3 h-3" />
						Memory
					</span>
					<span class="font-medium">{submissionDetails.memory}</span>
					<span class="text-sm text-muted-foreground">MB</span>
				</div>
			</section>

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
