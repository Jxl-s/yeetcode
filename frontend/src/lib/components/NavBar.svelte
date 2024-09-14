<script>
	import NavLink from './NavLink.svelte';
	import Button from './ui/button/button.svelte';
</script>

<div class="border-b">
	<div class="flex items-center px-4 h-16">
		<a href="/" class="font-bold text-2xl">YeetCode</a>
		<div class="flex items-center space-x-4 lg:space-x-6 mx-6">
			<NavLink href="/" active={false}>Explore</NavLink>
			<NavLink href="/" active={true}>Problems</NavLink>
		</div>
		<div class="ml-auto flex items-center space-x-4 text-sm">
			<!-- <Button disabled={true}>Sign In</Button> -->
		</div>
	</div>
</div>
