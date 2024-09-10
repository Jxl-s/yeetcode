<script>
	import { AuthState, authStore, axiosInstance, signOut } from '$lib/stores/auth';

	$: signedIn = $authStore.state === AuthState.SignedIn;
	$: signedOut = $authStore.state === AuthState.SignedOut;
</script>

<h1 class="text-3xl font-bold">Welcome to YeetCode</h1>
<ul>
	{#if signedOut}
		<li>
			<a href="/api/auth/google">Sign In</a>
		</li>
	{/if}
	{#if signedIn}
		<li>
			<button on:click={signOut}>Sign Out</button>
		</li>
		<li>
			<button
				on:click={async () => {
					const res = await axiosInstance.get('/auth/protected');
					console.log('res', res);
				}}
			>
				Try protected
			</button>
		</li>
	{/if}
</ul>
