<script>
	import Play from 'lucide-svelte/icons/play';
	import CloudUpload from 'lucide-svelte/icons/cloud-upload';

	import Button from '../ui/button/button.svelte';
</script>

<div class="flex-grow flex items-center justify-center gap-2">
	<Button variant="outline" class="flex items-center gap-2 font-semibold">
		<Play class="w-4 h-4" />
		Run
	</Button>
	<Button variant="outline" class="flex items-center gap-2 font-semibold text-green-500">
		<CloudUpload class="w-4 h-4" />
		Submit
	</Button>
</div>
