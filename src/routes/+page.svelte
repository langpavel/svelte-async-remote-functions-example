<script lang="ts">
	import { addTodo, deleteTodo, getTodos, toggleTodo } from './todos.remote';

	const todos = getTodos();

	$effect(() => {
		console.log('Todos updated:', todos.current?.length);
	});
	// $inspect(todos.current).with(console.trace);
</script>

<main>
	<h1>Todo App</h1>
	<form
		{...addTodo.enhance(async ({ submit, data }) => {
			const text = data.get('text')!.toString().trim();
			const release = await todos.override((todos) => [...todos, { id: '0', text, done: false }]);
			try {
				await submit();
			} finally {
				release();
			}
		})}
	>
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
							const release = await todos.override((todos) =>
								todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
							);
							try {
								await toggleTodo(todo.id);
								// For showcasing purposes toggleTodo does not do a single flight mutation, so we refresh on the client
								await todos.refresh();
							} finally {
								release();
							}
						}}
					/>
					<span class={{ done: todo.done }}>{todo.text}</span>
				</label>

				<form
					{...remove.enhance(async ({ submit }) => {
						const release = await todos.override((todos) => todos.filter((t) => t.id !== todo.id));
						try {
							await submit();
						} catch {
							// We catch the error to not show the nearest error page, instead we show the error inline
						} finally {
							// neither the server side nor the client side refresh will update the todos,
							// so you can see in the network tab that everything is refreshed by default
							release();
						}
					})}
				>
					{#if remove.error}<span class="error">{remove.error.message}</span>{/if}
					<button name="id" value={todo.id}>Delete</button>
				</form>
			</li>
		{/each}
	</ul>

	<!-- <hr />
	<ul>
		{#each todos?.current ?? [] as todo}
			<li class={{ pending: todo.id === 0 }}>
				<span class={{ done: todo.done }}>{todo.text}</span>

				<button>Delete</button>
			</li>
		{/each}
	</ul> -->
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
		margin-bottom: 1rem;
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
	label {
		flex: 1;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
</style>
