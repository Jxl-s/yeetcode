<script>
	import '../app.css';
	import { AuthState, authStore, axiosInstance, fetchToken, signOut } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { page } from '$app/stores';

	onMount(async () => {
		// Try to sign in
		if ($authStore.state === AuthState.None) {
			const fetchTokenSuccess = await fetchToken();
			console.log('get token success', fetchTokenSuccess);
		}
	});
</script>

<main class="w-full h-full">
	{#if $authStore.state !== AuthState.None}
		<div class="flex flex-col w-full h-full">
			<NavBar />
			<section class="p-4 flex-grow overflow-auto">
				<slot />
			</section>
		</div>
	{/if}
</main>
