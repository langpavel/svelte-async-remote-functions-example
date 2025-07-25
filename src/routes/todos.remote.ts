import { command, form, query } from "$app/server";
import { error } from "@sveltejs/kit";
import z from "zod/v4";
import { checkLoggedIn } from "./login/login.remote";

let todos: Array<{ id: string; text: string; done: boolean }> = [];

export const getTodos = query(async () => {
  // TODO this doesn't work yet, needs some stuff fixed in the async branch
  await checkLoggedIn();

  return todos;
});

export const addTodo = form(async (data) => {
  const text = data.get("text") as string;
  if (!text) {
    return "Todo text cannot be empty.";
  }

  todos.push({
    id: crypto.randomUUID(),
    text,
    done: false,
  });

  await getTodos().refresh();
});

export const toggleTodo = command(z.string(), async (id) => {
  const todo = todos.find((t) => t.id === id);
  if (!todo) error(404, "Todo not found");

  // Simulate a long running operation to showcase optimistic UI updates
  await new Promise((resolve) => setTimeout(resolve, 1000));

  todo.done = !todo.done;
});

export const deleteTodo = form(async (data) => {
  const id = data.get("id") as string;
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) error(404, "Todo not found");

  if (Math.random() < 0.2) error(500, "Random error occurred while deleting todo");

  todos.splice(index, 1);
});
