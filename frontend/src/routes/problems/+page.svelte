<script>
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';
	import { axiosInstance } from '$lib/stores/auth.js';
	import CircleCheckBig from 'lucide-svelte/icons/circle-check-big';
	import { onMount } from 'svelte';

	// TODO: Centralize this, because it will be used later on
	const diffColors = {
		EASY: 'text-green-500',
		MEDIUM: 'text-yellow-500',
		HARD: 'text-red-500'
	};

	const diffText = {
		EASY: 'Easy',
		MEDIUM: 'Medium',
		HARD: 'Hard'
	};

	let page = 1;
	let loading = true;

	// TODO: Typpe this and centralize this
	let problems = [];

	/**
	 * Fetches the data from the API
	 */
	async function fetchProblems() {
		try {
			const { status, data } = await axiosInstance.get(
				`${PUBLIC_API_BASE_URL}/problems?page=${page}`
			);

			if (status !== 200) {
				throw new Error('Failed to fetch data');
			}

			problems = data.data;
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
	<Table.Root>
		<Table.Caption>
			<Button on:click={() => fetchPage(page - 1)}>Previous</Button>
			<Button on:click={() => fetchPage(page + 1)}>Next</Button>
		</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Status</Table.Head>
				<Table.Head class="w-[300px]">Title</Table.Head>
				<Table.Head class="w-[100px]">Difficulty</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#if !loading}
				{#each problems as question, i}
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
							{diffText[question.difficulty]}
						</Table.Cell>
					</Table.Row>
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
</div>
