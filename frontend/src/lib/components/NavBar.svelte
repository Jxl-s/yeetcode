<script>
	import { page } from '$app/stores';
	import { AuthState, authStore } from '$lib/stores/auth';

	import NavLink from './NavLink.svelte';
	import NavUser from './NavUser.svelte';
	import CodeRunnerHeader from './problems/CodeRunnerHeader.svelte';
	import Button from './ui/button/button.svelte';

	/**
	 * @type {{ title: string; href: string; current: (page: string) => boolean; }[]}
	 */
	const pages = [
		{
			title: 'Explore',
			href: '/explore',
			current: (page) => page === '/explore'
		},
		{
			title: 'Problems',
			href: '/problems',
			current: (page) => page.startsWith('/problems')
		}
	];

	$: signedIn = $authStore.state === AuthState.SignedIn;

	$: problemNavBar = $page.url.pathname.startsWith('/problems/');
</script>

<div class="border-b">
	<div class="flex items-center px-4 h-16">
		<a href="/" class="font-bold text-2xl">YeetCode</a>
		{#if problemNavBar}
			<CodeRunnerHeader />
		{:else}
			<div class="flex items-center space-x-4 lg:space-x-6 mx-6">
				{#each pages as { title, href, current }}
					<NavLink {href} active={current($page.url.pathname)}>{title}</NavLink>
				{/each}
			</div>
		{/if}

		<div class="ml-auto flex items-center space-x-4 text-sm">
			{#if signedIn}
				<NavUser />
			{:else}
				<Button variant="outline" href="/api/auth/google">Sign In</Button>
			{/if}
		</div>
	</div>
</div>
