import { command, form, query } from '$app/server';
import { error } from '@sveltejs/kit';
import { checkLoggedIn } from './login/login.remote';

let todos: Array<{ id: number; text: string; done: boolean }> = [];

export const getTodos = query(async () => {
	// TODO this doesn't work yet, needs some stuff fixed in the async branch
	// await checkLoggedIn();

	// Simulate a long running operation to showcase optimistic UI updates,
	// but only once we have at least one todo, to not make people think
	// that Svelte(Kit) is slow.
	if (todos.length > 0) {
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
	return todos;
});

export const addTodo = form((data) => {
	const text = data.get('text') as string;
	if (!text) {
		return 'Todo text cannot be empty.';
	}

	todos.push({
		id: Date.now(),
		text,
		done: false
	});
});

export const toggleTodo = command((id: number) => {
	const todo = todos.find((t) => t.id === id);
	if (!todo) error(404, 'Todo not found');

	todo.done = !todo.done;
});

export const deleteTodo = command((id: number) => {
	const index = todos.findIndex((t) => t.id === id);
	if (index === -1) error(404, 'Todo not found');
	todos.splice(index, 1);
});
