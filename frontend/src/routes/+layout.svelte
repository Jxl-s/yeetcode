<script>
	import '../app.css';
	import { AuthState, authStore, axiosInstance, fetchToken, signOut } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import NavBar from '$lib/components/NavBar.svelte';

	onMount(async () => {
		// Try to sign in
		if ($authStore.state === AuthState.None) {
			const fetchTokenSuccess = await fetchToken();
			console.log('get token success', fetchTokenSuccess);
		}
	});
</script>

<main>
	{#if $authStore.state === AuthState.None}
		<p>Loading...</p>
	{:else}
		<NavBar />
		<slot />
	{/if}
</main>
