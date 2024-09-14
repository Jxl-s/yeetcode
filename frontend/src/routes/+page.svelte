<script>
	import LogOut from 'lucide-svelte/icons/log-out';
	import Button from '$lib/components/ui/button/button.svelte';
	import { AuthState, authStore } from '$lib/stores/auth';

	$: signedOut = $authStore.state === AuthState.SignedOut;
</script>

<h1 class="text-3xl font-bold">Welcome to YeetCode</h1>
<p>A clone of a certain popular code execution platform.</p>