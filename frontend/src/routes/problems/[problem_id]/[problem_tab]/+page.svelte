<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import NotebookText from 'lucide-svelte/icons/notebook-text';
	import FileJson from 'lucide-svelte/icons/file-json';
	import { page } from '$app/stores';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-screen">
	<Resizable.Pane defaultSize={50} class="pe-2">
		<section class="bg-primary-foreground w-full h-full rounded-md px-4">
			<header class="py-4 flex gap-2">
				<Button
					variant={$page.params.problem_tab === 'description' ? 'default' : 'ghost'}
					class="flex items-center gap-2"
					href="description"
				>
					<NotebookText class="w-3 h-3" />
					Description
				</Button>
				<Button
					variant={$page.params.problem_tab === 'submissions' ? 'default' : 'ghost'}
					class="flex items-center gap-2"
					href="submissions"
				>
					<FileJson class="w-3 h-3" />
					Submissions
				</Button>
			</header>
			<div class="mt-2 px-2">
				<h1 class="text-3xl font-semibold">1. Two Sum</h1>
				<br />
				<div class="text-sm">
					<p>
						You are given two <b>non-empty</b> linked lists representing two non-negative integers.
						The digits are stored in <b>reverse order</b>, and each of their nodes contains a single
						digit. Add the two numbers and return the sum as a linked list.
					</p>
					<br />
					<p>
						You may assume the two numbers do not contain any leading zero, except the number 0
						itself.
					</p>
				</div>
			</div>
		</section>
	</Resizable.Pane>
	<Resizable.Handle class="opacity-0 hover:opacity-100 bg-blue-500 duration-300" withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical" class="h-full">
			<Resizable.Pane defaultSize={50} class="ps-2 pb-2">
				<div class="bg-primary-foreground w-full h-full rounded-md"></div>
			</Resizable.Pane>
			<Resizable.Handle class="opacity-0 hover:opacity-100 bg-blue-500 duration-300" withHandle />
			<Resizable.Pane defaultSize={50} class="pt-2 ps-2">
				<div class="bg-primary-foreground w-full h-full rounded-md"></div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
