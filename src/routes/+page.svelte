<script lang="ts">
	import { addTodo, deleteTodo, getTodos, toggleTodo } from './todos.remote';

	const todos = getTodos();

	$effect(() => {
		console.log('Todos updated:', console.log(JSON.stringify(todos.current)));
	});
</script>

<main>
	<h1>Todo App</h1>
	<!-- by spreading onto the form you get an auto-enhanced form as soon as JS is available -->
	<form {...addTodo}>
		<input type="text" name="text" placeholder="Add a new todo" autocomplete="off" />
		<button type="submit">Add</button>
	</form>

	<ul>
		{#each await todos as todo}
			<!-- We can scope a form function that is used in a loop to an entry like this -->
			{@const remove = deleteTodo.for(todo.id)}

			<li class={{ pending: todo.id === '0' }}>
				<label>
					<input
						type="checkbox"
						checked={todo.done}
						onchange={async () => {
							// Normally you should make this a form, too, but we want to showcase using commands here

							// By using `.updates(...)` we can update the local state optimistically and tell the server to refresh the state
							// on the server and return it in the same request (single flight mutation).
							// `.updates(...)` is also available for form submit functions (e.g. `submit().updates(...)`)
							await toggleTodo(todo.id).updates(
								todos.withOverride((todos) =>
									todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
								)
							);
						}}
					/>
					<span class={{ done: todo.done }}>{todo.text}</span>
				</label>

				<form
					{...remove.enhance(async ({ submit }) => {
						try {
							await submit();
						} catch {
							// We catch the error to not show the nearest error page, instead we show the error inline
						} finally {
							// neither the server side nor the client side will update the todos via a targeted refresh,
							// so you can see in the network tab that everything is refreshed by default
						}
					})}
				>
					{#if remove.error}<span class="error">{remove.error.message}</span>{/if}
					<button name="id" value={todo.id}>Delete</button>
				</form>
			</li>
		{/each}
	</ul>
</main>

<style>
	main {
		max-width: 400px;
		margin: 2rem auto;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 8px;
		background: #fafafa;
	}
	form {
		display: flex;
		gap: 0.5rem;
	}
	input[type='text'] {
		flex: 1;
		padding: 0.5rem;
		border: 1px solid #bbb;
		border-radius: 4px;
	}
	button {
		padding: 0.5rem 1rem;
		border: none;
		background: #007acc;
		color: white;
		border-radius: 4px;
		cursor: pointer;
	}
	button:hover {
		background: #005fa3;
	}
	ul {
		list-style: none;
		padding: 0;
	}
	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid #eee;
	}
	.pending {
		opacity: 0.5;
		pointer-events: none;
	}
	.done {
		text-decoration: line-through;
		color: #888;
	}
	.error {
		color: red;
		align-content: center;
	}
	label {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
