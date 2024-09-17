<script>
	import * as Table from '$lib/components/ui/table';
</script>

<Table.Root>
	<Table.Header>
		<Table.Row>
			<Table.Head>Status</Table.Head>
			<Table.Head>Language</Table.Head>
			<Table.Head>Runtime</Table.Head>
			<Table.Head>Memory</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		<Table.Row>
			<Table.Cell>
				<span class="block font-semibold text-green-500">Accepted</span>
				<span class="block text-muted-foreground text-xs">Sep 14, 2024</span>
			</Table.Cell>
			<Table.Cell>Python3</Table.Cell>
			<Table.Cell>1210 ms</Table.Cell>
			<Table.Cell>44.1 MB</Table.Cell>
		</Table.Row>
		<Table.Row>
			<Table.Cell>
				<span class="block font-semibold text-red-500">Time Limit Exceeded</span>
				<span class="block text-muted-foreground text-xs">Sep 14, 2024</span>
			</Table.Cell>
			<Table.Cell>Python3</Table.Cell>
			<Table.Cell>N/A</Table.Cell>
			<Table.Cell>N/A</Table.Cell>
		</Table.Row>
		<Table.Row>
			<Table.Cell>
				<span class="block font-semibold text-red-500">Wrong Answer</span>
				<span class="block text-muted-foreground text-xs">Sep 14, 2024</span>
			</Table.Cell>
			<Table.Cell>Python3</Table.Cell>
			<Table.Cell>N/A</Table.Cell>
			<Table.Cell>N/A</Table.Cell>
		</Table.Row>
		<Table.Row>
			<Table.Cell>
				<span class="block font-semibold text-red-500">Wrong Answer</span>
				<span class="block text-muted-foreground text-xs">Sep 14, 2024</span>
			</Table.Cell>
			<Table.Cell>Java</Table.Cell>
			<Table.Cell>N/A</Table.Cell>
			<Table.Cell>N/A</Table.Cell>
		</Table.Row>
	</Table.Body>
</Table.Root>
