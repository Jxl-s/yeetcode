<script>
	import { page } from '$app/stores';
	import { AuthState, authStore } from '$lib/stores/auth';
	import NavLink from './NavLink.svelte';
	import NavUser from './NavUser.svelte';
	import Button from './ui/button/button.svelte';

	const pages = [
		{
			name: 'Explore',
			href: '/explore',
			current: (page) => page === '/'
		},
		{
			name: 'Problems',
			href: '/problems',
			current: (page) => page === '/problems'
		}
	];

	$: signedIn = $authStore.state === AuthState.SignedIn;
</script>

<div class="border-b">
	<div class="flex items-center px-4 h-16">
		<a href="/" class="font-bold text-2xl">YeetCode</a>
		<div class="flex items-center space-x-4 lg:space-x-6 mx-6">
			{#each pages as { name, href, current }}
				<NavLink {href} active={current($page.url.pathname)}>{name}</NavLink>
			{/each}
		</div>
		<div class="ml-auto flex items-center space-x-4 text-sm">
			{#if signedIn}
				<NavUser />
			{:else}
				<Button disabled={true} variant="outline">Sign In</Button>
			{/if}
		</div>
	</div>
</div>
