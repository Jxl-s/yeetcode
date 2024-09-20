<script>
	/** @type {string} */
	export let error;

	let className;
	export { className as class };
</script>

<div class={className}>
	<div class="w-full bg-red-950 px-4 py-2 rounded-md">
		<code class="text-red-300 rounded-lg text-xs">
			{error}
		</code>
	</div>
</div>
