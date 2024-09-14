<script>
	/** @type {string} */
	export let href;
	/** @type {boolean} */
	export let active;
</script>

<a
	{href}
	class="text-sm font-medium transition-colors hover:text-primary
    {!active && 'text-muted-foreground'}"
>
	<slot />
</a>