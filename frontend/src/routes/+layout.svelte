<script>
	import '../app.css';
	import { AuthState, authStore, axiosInstance, fetchToken } from '$lib/stores/auth';
	import { onMount } from 'svelte';
	import axios from 'axios';

	onMount(async () => {
		// Try to sign in
		if ($authStore.state === AuthState.None) {
			const fetchTokenSuccess = await fetchToken();
			console.log('get token success', fetchTokenSuccess);
		}
	});
</script>

{#if $authStore.state === AuthState.None}
	<p>Loading...</p>
{:else}
	<slot />
	<button
		on:click={async () => {
			const res = await axiosInstance.get('/auth/protected');
			console.log('res', res);
		}}
	>
		Try protected
	</button>
	<button
		on:click={async () => {
			const res = await axiosInstance.post('/auth/signout');
			console.log('res', res);
		}}
	>
		Sign Out
	</button>
{/if}
