<script lang="ts">
  import { addTodo, deleteTodo, getTodos, toggleTodo } from "./todos.remote";

  const todos = getTodos();

  $effect(() => {
    console.log("Todos updated:", console.log(JSON.stringify(todos.current)));
  });
</script>

<main class="max-w-sm mx-auto mt-6 p-4 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800">
  <h1 class="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Todo App</h1>
  <!-- by spreading onto the form you get an auto-enhanced form as soon as JS is available -->
  <form {...addTodo} class="flex gap-2 mb-4">
    <input 
      type="text" 
      name="text" 
      placeholder="Add a new todo" 
      autocomplete="off" 
      class="flex-1 px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
    />
    <button 
      type="submit"
      class="px-3 py-1.5 text-sm bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
    >
      Add
    </button>
  </form>

  <ul class="space-y-1">
    {#each await todos as todo}
      <!-- We can scope a form function that is used in a loop to an entry like this -->
      {@const remove = deleteTodo.for(todo.id)}

      <li class="flex items-center justify-between py-2 px-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0" class:opacity-50={todo.id === "0"} class:pointer-events-none={todo.id === "0"}>
        <label class="flex items-center gap-2 flex-1 cursor-pointer">
          <input
            type="checkbox"
            checked={todo.done}
            class="w-3.5 h-3.5 text-blue-600 dark:text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-1 bg-white dark:bg-gray-700"
            onchange={async () => {
              // Normally you should make this a form, too, but we want to showcase using commands here

              // By using `.updates(...)` we can update the local state optimistically and tell the server to refresh the state
              // on the server and return it in the same request (single flight mutation).
              // `.updates(...)` is also available for form submit functions (e.g. `submit().updates(...)`)
              await toggleTodo(todo.id).updates(
                todos.withOverride((todos) =>
                  todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)),
                ),
              );
            }}
          />
          <span class="text-sm text-gray-800 dark:text-gray-200" class:line-through={todo.done} class:text-gray-500={todo.done} class:dark:text-gray-500={todo.done}>{todo.text}</span>
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
          class="flex items-center gap-1"
        >
          {#if remove.error}<span class="text-red-600 dark:text-red-400 text-xs">{remove.error.message}</span>{/if}
          <button 
            name="id" 
            value={todo.id}
            class="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-1 transition-colors"
          >
            Delete
          </button>
        </form>
      </li>
    {/each}
  </ul>
</main>
