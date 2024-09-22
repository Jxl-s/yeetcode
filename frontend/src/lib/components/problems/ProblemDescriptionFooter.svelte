<script>
	import ThumbsUp from 'lucide-svelte/icons/thumbs-up';
	import ThumbsDown from 'lucide-svelte/icons/thumbs-down';

	import Button from '../ui/button/button.svelte';
	import { problemStore } from '$lib/stores/problem';

	$: problem = $problemStore.problem;
</script>

<!-- TODO: replace these with the likes/dislikes counts -->
{#if problem}
	<footer class="px-2 pt-2 flex gap-2">
		<Button variant="secondary" class="flex gap-2 items-center">
			<ThumbsUp class="w-3 h-3" />
			{problem.submissions}
		</Button>
		<Button variant="secondary" class="flex gap-2 items-center">
			<ThumbsDown class="w-3 h-3" />
			{problem.submissions}
		</Button>
	</footer>
{/if}
