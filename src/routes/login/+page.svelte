<script>
	import { login } from './login.remote';
</script>

<!-- spreads method=post, onsubmit={handleToNotDoFullPageReload} and action="the login remote form function id" onto the form -->
<form {...login}>
	<label for="passphrase">Enter the passphrase "Svelte":</label>
	<input name="passphrase" autocomplete="off" placeholder="Svelte" />
	<button type="submit">Login</button>
	{#if login.result}
		<p class="error">{login.result}</p>
	{/if}
</form>

<style>
	form {
		max-width: 300px;
		margin: 2rem auto;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	input,
	button {
		padding: 0.5rem;
		border: 1px solid #bbb;
		border-radius: 3px;
	}
	button {
		background: #005fa3;
		color: #fff;
		border: none;
		cursor: pointer;
	}
	.error {
		color: #d00;
		font-size: 0.9em;
	}
</style>
