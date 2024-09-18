<script>
	import { page } from '$app/stores';
	import * as Table from '$lib/components/ui/table';

	import Clock from 'lucide-svelte/icons/clock';
	import DatabaseZap from 'lucide-svelte/icons/memory-stick';

	const submissions = [
		{
			id: 232392,
			status: 'Accepted',
			date: new Date('2024-09-14'),
			language: 'Python3',
			runtime: 1201,
			memory: 0.1
		},
		{
			id: 232393,
			status: 'Time Limit Exceeded',
			date: new Date('2024-09-14'),
			language: 'Python3',
			runtime: null,
			memory: null
		},
		{
			id: 232394,
			status: 'Wrong Answer',
			date: new Date('2024-09-14'),
			language: 'Python3',
			runtime: null,
			memory: null
		},
		{
			id: 232395,
			status: 'Accepted',
			date: new Date('2024-09-14'),
			language: 'JavaScript',
			runtime: 950,
			memory: 0.2
		},
		{
			id: 232396,
			status: 'Compilation Error',
			date: new Date('2024-09-14'),
			language: 'C++',
			runtime: null,
			memory: null
		}
	];

	/**
	 * Generates the submission href
	 * @param id {number}
	 */
	function submissionHref(id) {
		return `/problems/${$page.params.problem_id}/submissions/${id}`;
	}

	$: submissionsFormatted = submissions.map((submission) => ({
		...submission,
		runtime: submission.runtime ? `${submission.runtime} ms` : 'N/A',
		memory: submission.memory ? `${submission.memory} MB` : 'N/A',
		date: submission.date.toLocaleDateString('en-US', {
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
			<Table.Row>
				<Table.Cell>
					<a href={submissionHref(submission.id)} class="block font-semibold">
						<span
							class={`block font-semibold ${submission.status === 'Accepted' ? 'text-green-500' : 'text-red-500'}`}
						>
							{submission.status}
						</span>
						<span class="block text-muted-foreground text-xs">
							{submission.date}
						</span>
					</a>
				</Table.Cell>
				<Table.Cell>{submission.language}</Table.Cell>
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
