<script>
	import { isHttpError } from '@sveltejs/kit';

	let { children } = $props();
</script>

<svelte:boundary>
	{@render children()}

	{#snippet pending()}
		<ul>
			{#each Array(3)}
				<li class="pending">
					<label>
						<input type="checkbox" disabled />
						<span class="skeleton skeleton-text"></span>
					</label>
					<button disabled class="skeleton skeleton-btn">Delete</button>
				</li>
			{/each}
		</ul>
	{/snippet}

	{#snippet failed(e)}
		<p class="error">{isHttpError(e) ? e.body.message : 'Internal Error'}</p>
	{/snippet}
</svelte:boundary>

<style>
	ul {
		list-style: none;
		padding: 0;
		max-width: 400px;
		margin: 10rem auto;
		padding: 1rem;
	}
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
	}
	.skeleton {
		background: #eee;
		border-radius: 4px;
		display: inline-block;
	}
	.skeleton-text {
		width: 120px;
		height: 1em;
		margin-left: 0.5em;
	}
	.skeleton-btn {
		width: 50px;
		height: 2em;
		margin-left: 1em;
	}
	.pending {
		opacity: 0.5;
		pointer-events: none;
	}

	.error {
		color: red;
		font-weight: bold;
	}
</style>
