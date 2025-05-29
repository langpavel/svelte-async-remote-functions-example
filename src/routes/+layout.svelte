<script>
	let { children } = $props();
</script>

<svelte:boundary>
	{@render children()}
	{#snippet pending()}
		loading...
	{/snippet}
</svelte:boundary>
