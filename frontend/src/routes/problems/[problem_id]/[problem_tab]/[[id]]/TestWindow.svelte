<script>
	import Button from '$lib/components/ui/button/button.svelte';

	import FileScan from 'lucide-svelte/icons/file-scan';
	import SquareChevronRight from 'lucide-svelte/icons/square-chevron-right';
</script>

<section class="bg-primary-foreground w-full h-full flex flex-col rounded-md px-4 pb-4">
	<header class="sticky top-0 pt-4 pb-2 flex gap-2 bg-primary-foreground z-10">
		<Button variant="default" class="flex items-center gap-2">
			<FileScan class="w-3 h-3" />
			Test Cases
		</Button>
		<Button variant="ghost" class="flex items-center gap-2">
			<SquareChevronRight class="w-3 h-3" />
			Test Results
		</Button>
	</header>
	<div class="flex-grow mt-2 px-2">
		<div class="flex gap-4 overflow-scroll">
			<Button variant="ghost">Case 1</Button>
			<Button variant="ghost" class="opacity-50">Case 2</Button>
			<Button variant="ghost" class="opacity-50">Case 3</Button>
			<Button variant="ghost" class="opacity-50">Case 4</Button>
			<Button variant="ghost" class="opacity-50">Case 5</Button>
		</div>
		<div class="mt-2 flex flex-col gap-4">
			<div>
				<span class="text-xs opacity-50 font-semibold">l1 =</span>
				<code class="text-sm block">[1, 5, 2, 2]</code>
			</div>
			<div>
				<span class="text-xs opacity-50 font-semibold">l2 =</span>
				<code class="text-sm block">[1, 5, 2, 2]</code>
			</div>
		</div>
	</div>
</section>
