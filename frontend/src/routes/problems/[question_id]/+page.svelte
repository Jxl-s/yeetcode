<script>
	import * as Resizable from '$lib/components/ui/resizable/index.js';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-screen">
	<Resizable.Pane defaultSize={50} class="pe-2">
		<div class="bg-primary-foreground w-full h-full rounded-lg"></div>
	</Resizable.Pane>
	<Resizable.Handle class="opacity-0 hover:opacity-100 bg-blue-500 duration-300" withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical" class="h-full">
			<Resizable.Pane defaultSize={50} class="ps-2 pb-2">
				<div class="bg-primary-foreground w-full h-full rounded-lg"></div>
			</Resizable.Pane>
			<Resizable.Handle class="opacity-0 hover:opacity-100 bg-blue-500 duration-300" withHandle />
			<Resizable.Pane defaultSize={50} class="pt-2 ps-2">
				<div class="bg-primary-foreground w-full h-full rounded-lg"></div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
