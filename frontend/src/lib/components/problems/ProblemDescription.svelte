<script>
	import { diffColors, diffText } from '$lib/data/problems';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import Tags from 'lucide-svelte/icons/tags';
	import { formatNumber } from '$lib/util/number';
	import { tags } from '$lib/data/tags';
	import Button from '../ui/button/button.svelte';

	/** @type {import('$lib/data/problems').Problem | null} */
	export let problem;
</script>

{#if problem}
	<h1 class="text-3xl font-semibold">{problem.number}. {problem.title}</h1>
	<span class={`${diffColors[problem.difficulty] ?? ''} text-sm block mt-2`}>
		{diffText[problem.difficulty] ?? ''}
	</span>
	<div class="text-sm mt-4 md-container pb-4">
		<p>
			Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return
			<em>indices of the two numbers such that they add up to <code>target</code></em>.
		</p>

		<p>
			You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and
			you may not use the <em>same</em> element twice.
		</p>

		<p>You can return the answer in any order.</p>

		<p>&nbsp;</p>
		<p><strong class="example">Example 1:</strong></p>

		<pre>
<strong>Input:</strong> nums = [2,7,11,15], target = 9
<strong>Output:</strong> [0,1]
<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
</pre>

		<p><strong class="example">Example 2:</strong></p>

		<pre>
<strong>Input:</strong> nums = [3,2,4], target = 6
<strong>Output:</strong> [1,2]
</pre>

		<p><strong class="example">Example 3:</strong></p>

		<pre>
<strong>Input:</strong> nums = [3,3], target = 6
<strong>Output:</strong> [0,1]
</pre>

		<p>&nbsp;</p>
		<p><strong>Constraints:</strong></p>

		<ul>
			<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
			<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
			<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
			<li><strong>Only one valid answer exists.</strong></li>
		</ul>

		<p>&nbsp;</p>
		<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than
		<code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?
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
	.md-container p {
		margin-bottom: 1rem;
	}

	.md-container pre {
		margin: 1rem 0 1rem 0;
		padding-left: 1rem;
		color: rgba(255, 255, 255, 0.5);
	}

	ul {
		list-style-type: disc;
		list-style-position: inside;
		color: rgba(255, 255, 255, 0.5);
	}

	code {
		color: rgba(255, 255, 255, 0.5);
		padding: 0.125rem;
	}

	ul li {
		margin-bottom: 0.75rem;
	}
</style>
