<script>
	import Clock from 'lucide-svelte/icons/clock';
	import DatabaseZap from 'lucide-svelte/icons/memory-stick';
	import MoveLeft from 'lucide-svelte/icons/move-left';
	import Copy from 'lucide-svelte/icons/copy';

	import Button from '../ui/button/button.svelte';
	import { onMount } from 'svelte';
	import PythonIcon from '../icons/PythonIcon.svelte';

	/** @type {string} */
	export let problemId;
	const submissionsHref = `/problems/${problemId}/submissions`;

	// Handle copying
	let copyStatus = false;
	function copySolution() {
		copyStatus = true;
		setTimeout(() => {
			copyStatus = false;
		}, 1000);
	}

	/** @type {HTMLElement}*/
	let codeBox;
	/** @type {import("monaco-editor")} */
	let Monaco;

	onMount(async () => {
		// Load Monaco Editor
		Monaco = await import('monaco-editor');

		// Apply syntax highlighting to the div element
		Monaco.editor
			.colorize(
				'class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")class Solution():\n\tdef addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n\t\tcomplements = {}\n\t\tfor i in range(len(nums)):\n\t\t\tprint("hello world!")',
				'python',
				{}
			)
			.then((html) => {
				codeBox.innerHTML = html;
			});
	});
</script>

<div class="w-full h-full">
	<a
		class="text-muted-foreground flex gap-2 items-center hover:underline text-sm"
		href={submissionsHref}
	>
		<MoveLeft class="w-3 h-3" />
		Back to Submissions
	</a>
	<div class="px-4 mt-4">
		<header class="flex justify-between">
			<div>
				<span class="font-semibold text-green-500 block">Accepted</span>
				<span class="text-xs text-muted-foreground block">You submitted at Sep 14, 2024 12:20</span>
			</div>
			<div>
				<Button variant="secondary" on:click={copySolution} disabled={copyStatus}>
					<Copy class="w-3 h-3 mr-3" />
					{#if copyStatus}
						Copied!
					{:else}
						Copy Solution
					{/if}
				</Button>
			</div>
		</header>
		<section class="w-full flex mt-4">
			<div class="w-full">
				<span class="font-semibold flex items-center gap-2">
					<Clock class="w-3 h-3" />
					Runtime
				</span>
				<span class="font-medium">1100</span>
				<span class="text-sm text-muted-foreground">ms</span>
			</div>
			<div class="w-full">
				<span class="font-semibold flex items-center gap-2">
					<DatabaseZap class="w-3 h-3" />
					Memory
				</span>
				<span class="font-medium">82.2</span>
				<span class="text-sm text-muted-foreground">MB</span>
			</div>
		</section>

		<!-- Code section -->
		<div class="mt-8 text-sm opacity-50">
			<span class="font-semibold flex gap-2 items-center">
				<PythonIcon class="w-3 h-3" />
				Python3
			</span>
		</div>
		<section class="w-full bg-[#141414] rounded-md mt-2 relative">
			<div class="overflow-scroll p-4">
				<code class="text-xs text-nowrap" bind:this={codeBox} />
			</div>
		</section>
	</div>
</div>
