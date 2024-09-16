<script>
	import { PUBLIC_API_BASE_URL } from '$env/static/public';
	import * as Table from '$lib/components/ui/table';
	import { diffColors, diffText } from '$lib/data/problems';
	import { axiosInstance } from '$lib/stores/auth.js';
	import CircleCheckBig from 'lucide-svelte/icons/circle-check-big';
	import { onMount } from 'svelte';
	import * as Pagination from '$lib/components/ui/pagination';

	let page = 1;
	let limit = 50;
	let count = 0;
	let loading = true;

	/** @type {import('$lib/data/problems').ListedProblem[]} */
	let problems = [];

	/**
	 * Fetches the data from the API
	 */
	async function fetchProblems() {
		try {
			const { status, data } = await axiosInstance.get(
				`${PUBLIC_API_BASE_URL}/problems?page=${page}&limit=${limit}`
			);

			if (status !== 200) {
				throw new Error('Failed to fetch data');
			}

			problems = data.data;
			count = data.count;
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
			<Pagination.Root {count} perPage={limit} let:pages let:currentPage>
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton on:click={() => fetchPage(currentPage - 1)} />
					</Pagination.Item>
					{#each pages as p (p.key)}
						{#if p.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item isVisible={currentPage == p.value}>
								<Pagination.Link
									page={p}
									isActive={currentPage == p.value}
									on:click={() => fetchPage(p.value)}
								>
									{p.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton on:click={() => fetchPage(currentPage + 1)} />
					</Pagination.Item>
				</Pagination.Content>
			</Pagination.Root>
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
