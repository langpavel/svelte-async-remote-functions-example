<script lang="ts">
	import { addTodo, deleteTodo, getTodos, toggleTodo } from './todos.remote';

	const todos = getTodos();
</script>

<main>
	<h1>Todo App</h1>
	<form
		{...addTodo.enhance(({ submit, data, form }) => {
			const text = data.get('text')!.toString().trim();
			todos.optimistic(
				(todos) => [...todos, { id: 0, text, done: false }],
				async () => {
					const { apply } = await submit();
					apply();
				}
			);
		})}
	>
		<input type="text" name="text" placeholder="Add a new todo" autocomplete="off" />
		<button type="submit">Add</button>
	</form>

	<ul>
		{#each await todos as todo}
			<li class={{ pending: todo.id === 0 }}>
				<label>
					<input
						type="checkbox"
						checked={todo.done}
						onchange={() => {
							// Normally you should make this a form, too, but we want to showcase using commands here
							// TODO this doesn't always work right away yet, specifically when spamming because then
							// a query refresh is pending which the override is then waiting on. We might need to make that logic smarter
							todos.optimistic(
								(todos) => todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)),
								() => toggleTodo(todo.id)
							);
						}}
					/>
					<span class={{ done: todo.done }}>{todo.text}</span>
				</label>
				<button
					onclick={() => {
						// Normally you should make this a form, too, but we want to showcase using commands here
						todos.optimistic(
							(todos) => todos.filter((t) => t.id !== todo.id),
							() => deleteTodo(todo.id)
						);
					}}>Delete</button
				>
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
