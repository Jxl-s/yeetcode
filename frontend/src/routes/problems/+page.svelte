<script>
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';
	import { diffColors, diffText } from '$lib/data/problems';
	import { axiosInstance } from '$lib/stores/auth.js';
	import CircleCheckBig from 'lucide-svelte/icons/circle-check-big';
	import { onMount } from 'svelte';

	// TODO: Centralize this, because it will be used later on
	let page = 1;
	let pages = 1;
	let loading = true;

	/** @type {import('$lib/data/problems').Problem[]} */
	let problems = [];

	/**
	 * Fetches the data from the API
	 */
	async function fetchProblems() {
		try {
			const { status, data } = await axiosInstance.get(
				`${PUBLIC_API_BASE_URL}/problems?page=${page}&limit=30`
			);

			if (status !== 200) {
				throw new Error('Failed to fetch data');
			}

			problems = data.data;
			pages = data.pages;
		} catch (err) {
			console.log(err);
		} finally {
			loading = false;
		}
	}

	/**
	 * Fetches a new page of problems
	 * @param newPage {number} The new page to fetch
	 */
	async function fetchPage(newPage) {
		page = newPage;
		loading = true;
		await fetchProblems();
	}

	onMount(fetchProblems);
</script>

<div class="max-w-2xl">
	<Table.Root id="table-top">
		<Table.Caption>
			<Button
				on:click={() => fetchPage(page - 1)}
				variant="ghost"
				disabled={page === 1 || loading}
				size="icon"
			>
				{'<'}
			</Button>
			{#each Array.from({ length: Math.min(pages, 5) }, (_, i) => i + 1) as p}
				<Button
					variant={page === p ? 'secondary' : 'outline'}
					on:click={() => fetchPage(p)}
					disabled={page === p || loading}
					class="mx-1"
				>
					{p}
				</Button>
			{/each}
			<Button
				on:click={() => fetchPage(page + 1)}
				variant="ghost"
				disabled={page === pages || loading}
				size="icon"
			>
				{'>'}
			</Button>
		</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Status</Table.Head>
				<Table.Head class="w-[500px]">Title</Table.Head>
				<Table.Head class="w-[100px]">Difficulty</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each problems as question, i}
				<Table.Row>
					<Table.Cell>
						<CircleCheckBig class="w-4 h-4 text-green-500" />
					</Table.Cell>
					<Table.Cell class="font-semibold">
						<a href={`/problems/${question.id}`} class="hover:underline">
							{question.number}. {question.title}
						</a>
					</Table.Cell>
					<Table.Cell class={`${diffColors[question.difficulty] ?? ''} font-semibold`}>
						{diffText[question.difficulty] ?? ''}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
