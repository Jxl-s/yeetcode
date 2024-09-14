<script>
	import * as Table from '$lib/components/ui/table';
	import CircleCheckBig from 'lucide-svelte/icons/circle-check-big';
	import { goto } from '$app/navigation';

	const diffColors = {
		Easy: 'text-green-500',
		Medium: 'text-yellow-500',
		Hard: 'text-red-500'
	};

	export let data;
</script>

<div class="max-w-2xl">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head>Status</Table.Head>
				<Table.Head>Title</Table.Head>
				<Table.Head>Difficulty</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.problems as question, i}
				<Table.Row>
					<Table.Cell>
						<CircleCheckBig class="w-4 h-4 text-green-500" />
					</Table.Cell>
					<Table.Cell class="font-semibold">
						<a href={`/problems/${question.id}`} class="hover:underline">
							{i + 1}. {question.title}
						</a>
					</Table.Cell>
					<Table.Cell class={`${diffColors[question.difficulty]} font-semibold`}>
						{question.difficulty}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
