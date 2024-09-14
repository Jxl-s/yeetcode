<script>
	import * as DropdownMenu from './ui/dropdown-menu';
	import * as Avatar from './ui/avatar';
	import Button from './ui/button/button.svelte';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} class="relative h-8 w-8 rounded-full">
			<Avatar.Root class="h-8 w-8">
				<Avatar.Image src={''} alt="@Jxl-s" />
				<Avatar.Fallback>{'U'}</Avatar.Fallback>
			</Avatar.Root>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">Jxl_s</p>
				<p class="text-xs leading-none text-muted-foreground">jxl_s@jxl_s.com</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => {}}>Profile</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => {}}>Settings</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={() => {}} class="font-medium text-red-500">Log out</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
