<script>
	import LogOut from 'lucide-svelte/icons/log-out';
	import IDCard from 'lucide-svelte/icons/id-card';
	import Button from '$lib/components/ui/button/button.svelte';
	import { AuthState, authStore, axiosInstance, signOut } from '$lib/stores/auth';

	$: signedIn = $authStore.state === AuthState.SignedIn;
	$: signedOut = $authStore.state === AuthState.SignedOut;
</script>

<h1 class="text-3xl font-bold">Welcome to YeetCode</h1>
<p>A clone of a certain popular code execution platform.</p>
<ul class="mt-2 flex gap-2">
	{#if signedOut}
		<li>
			<Button>
				<LogOut class="mr-2 h-4 w-4" />
				<a href="/api/auth/google">Sign In</a>
			</Button>
		</li>
	{/if}
	{#if signedIn}
		<li>
			<Button variant="destructive" on:click={signOut}>
				<LogOut class="mr-2 h-4 w-4" />
				Sign Out
			</Button>
		</li>
		<li>
			<Button
				variant="secondary"
				on:click={async () => {
					const res = await axiosInstance.get('/auth/protected');
					console.log('res', res);
				}}
			>
				Try protected
			</Button>
		</li>
	{/if}
</ul>
