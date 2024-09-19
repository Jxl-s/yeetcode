<script>
	import { page } from '$app/stores';
	import * as Table from '$lib/components/ui/table';

	import Clock from 'lucide-svelte/icons/clock';
	import DatabaseZap from 'lucide-svelte/icons/memory-stick';
	import { languageIcons } from '$lib/data/languages';
	import { submissionStatus } from '$lib/data/submissions';
	import { goto } from '$app/navigation';

	/** @type {import('$lib/data/submissions').ListedSubmission[]} */
	export let submissions = [];

	/**
	 * Generates the submission href
	 * @param id {number}
	 */
	function submissionHref(id) {
		return `/problems/${$page.params.problem_id}/submissions/${id}`;
	}

	$: submissionsFormatted = submissions.map((submission) => ({
		...submission,
		status: submissionStatus[submission.status] ?? 'N/A',
		runtime: submission.runtime ? `${submission.runtime} ms` : 'N/A',
		memory: submission.memory ? `${submission.memory} MB` : 'N/A',
		date: new Date(submission.created_at).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		})
	}));
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>Status</Table.Head>
			<Table.Head>Language</Table.Head>
			<Table.Head>Runtime</Table.Head>
			<Table.Head>Memory</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each submissionsFormatted as submission}
			<Table.Row on:click={() => goto(submissionHref(submission.id))} class="cursor-pointer">
				<Table.Cell>
					<span
						class={`block font-semibold ${submission.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}
					>
						{submission.status}
					</span>
					<span class="block text-muted-foreground text-xs">
						{submission.date}
					</span>
				</Table.Cell>
				<Table.Cell>
					<span class="flex items-center gap-2 text-muted-foreground">
						{#if submission.language in languageIcons}
							{@const Icon = languageIcons[submission.language]}
							<Icon class="w-4 h-4" />
						{/if}
						{submission.language}
					</span>
				</Table.Cell>
				<Table.Cell>
					<span class="flex items-center gap-2 text-muted-foreground">
						<Clock class="w-3 h-3" />
						{submission.runtime}
					</span>
				</Table.Cell>
				<Table.Cell>
					<span class="flex items-center gap-2 text-muted-foreground">
						<DatabaseZap class="w-3 h-3" />
						{submission.memory}
					</span>
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
