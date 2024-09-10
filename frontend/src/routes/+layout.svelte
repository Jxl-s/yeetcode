<script>
	import '../app.css';
	import { apiCall, AuthState, authStore, fetchToken } from '$lib/stores/auth';
	import { onMount } from 'svelte';

	onMount(async () => {
		// Try to sign in
		if ($authStore.state === AuthState.None) {
			const fetchTokenSuccess = await fetchToken();
			console.log('get token success', fetchTokenSuccess);
		}

		const testCall = await apiCall('GET', '/api/auth/protected');
		console.log(testCall);
	});
</script>

{#if $authStore.state === AuthState.None}
	<p>Loading...</p>
{:else}
	<slot />
{/if}
