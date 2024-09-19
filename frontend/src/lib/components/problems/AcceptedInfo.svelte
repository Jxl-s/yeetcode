<script>
	import Clock from 'lucide-svelte/icons/clock';
	import DatabaseZap from 'lucide-svelte/icons/memory-stick';

	/** @type {number} */
	export let runtime;

	/** @type {number} */
	export let memory;

	let className;
	export { className as class };
</script>

<section class={`${className} flex`}>
	<div class="w-full">
		<span class="font-semibold flex items-center gap-2">
			<Clock class="w-3 h-3" />
			Runtime
		</span>
		<span class="font-medium">{runtime}</span>
		<span class="text-sm text-muted-foreground">ms</span>
	</div>
	<div class="w-full">
		<span class="font-semibold flex items-center gap-2">
			<DatabaseZap class="w-3 h-3" />
			Memory
		</span>
		<span class="font-medium">{memory}</span>
		<span class="text-sm text-muted-foreground">MB</span>
	</div>
</section>
