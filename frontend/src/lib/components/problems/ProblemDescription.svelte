<script>
	import { diffColors, diffText } from '$lib/data/problems';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import Tags from 'lucide-svelte/icons/tags';
	import { formatNumber } from '$lib/util/number';
	import { tags } from '$lib/data/tags';
	import Button from '../ui/button/button.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import './ProblemDescription.css';

	/** @type {import('$lib/data/problems').Problem | null} */
	export let problem;
</script>

{#if problem}
	<h1 class="text-2xl font-semibold">{problem.number}. {problem.title}</h1>
	<span class={`${diffColors[problem.difficulty] ?? ''} text-sm block mt-2`}>
		{diffText[problem.difficulty] ?? ''}
	</span>
	<div class="text-sm mt-4 desc-md-container pb-4">
		<SvelteMarkdown source={problem.description} />
	</div>

	<br />
	<div class="flex w-full gap-8">
		<span class="text-sm text-white/50">
			Accepted:
			<b class="font-semibold text-base text-white">{formatNumber(problem.accepted)}</b>
		</span>
		<span class="text-sm text-white/50">
			Submissions:
			<b class="font-semibold text-base text-white">{formatNumber(problem.submissions)}</b>
		</span>
		<span class="text-sm text-white/50">
			Acceptance Rate:
			<b class="font-semibold text-base text-white">
				{problem.submissions > 0
					? ((problem.accepted / problem.submissions) * 100).toFixed(1)
					: '0.0'}%
			</b>
		</span>
	</div>
	<br />
	<Accordion.Root class="w-full">
		<Accordion.Item value="item-1">
			<Accordion.Trigger>
				<span class="flex items-center gap-2">
					<Tags class="w-5 h-5" />
					Topics
				</span>
			</Accordion.Trigger>
			<Accordion.Content>
				<div class="flex gap-2">
					{#each problem.tags as tag}
						<Button variant="ghost">{tags[tag] ?? tag}</Button>
					{/each}
				</div>
			</Accordion.Content>
		</Accordion.Item>

		<Accordion.Item value="item-2">
			<Accordion.Trigger>
				<span class="flex items-center gap-2">
					<Tags class="w-5 h-5" />
					Similar Questions
				</span>
			</Accordion.Trigger>
			<Accordion.Content></Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>
	<div class="mt-8 text-sm text-white/50">Copyright ©️ 2024 YeetCode. All Rights Reserved.</div>
{/if}

<style>
</style>
