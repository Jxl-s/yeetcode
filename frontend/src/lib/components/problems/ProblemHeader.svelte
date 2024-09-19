<script>
	import Button from '../ui/button/button.svelte';
	import NotebookText from 'lucide-svelte/icons/notebook-text';
	import FileJson from 'lucide-svelte/icons/file-json';

	/** @type {string} */
	export let problemId;

	/** @type {string} */
	export let tab;

	let className;
	export { className as class };

	const descriptionHref = `/problems/${problemId}/description`;
	const submissionsHref = `/problems/${problemId}/submissions`;
</script>

<header class={`flex gap-2 bg-primary-foreground ${className}`}>
	<Button
		variant={tab === 'description' ? 'default' : 'ghost'}
		class="flex items-center gap-2"
		href={descriptionHref}
	>
		<NotebookText class="w-3 h-3" />
		Description
	</Button>
	<Button
		variant={tab === 'submissions' ? 'default' : 'ghost'}
		class="flex items-center gap-2"
		href={submissionsHref}
	>
		<FileJson class="w-3 h-3" />
		Submissions
	</Button>
</header>
