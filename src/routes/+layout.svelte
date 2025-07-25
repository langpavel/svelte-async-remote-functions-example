<script>
  import "../app.css";
  import { isHttpError } from "@sveltejs/kit";
  import ThemeToggle from "$lib/ThemeToggle.svelte";

  let { children } = $props();
</script>

<div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
  <header class="flex items-center justify-between border-b border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
    <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Todo App</h1>
    <ThemeToggle />
  </header>

  <main class="flex-1 bg-gray-50 dark:bg-gray-900">
  <svelte:boundary>
    {@render children()}

    {#snippet pending()}
      <ul class="mx-auto mt-6 max-w-sm space-y-1 p-4">
        {#each Array(3)}
          <li
            class="pointer-events-none flex items-center justify-between border-b border-gray-200 px-2 py-2 opacity-50 last:border-b-0 dark:border-gray-700"
          >
            <label class="flex flex-1 items-center gap-2">
              <input
                type="checkbox"
                disabled
                class="h-3.5 w-3.5 rounded border-gray-300 bg-white text-blue-600 dark:border-gray-600 dark:bg-gray-700"
              />
              <span class="h-3.5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></span>
            </label>
            <button disabled class="h-5 w-12 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
            ></button>
          </li>
        {/each}
      </ul>
    {/snippet}

    {#snippet failed(e)}
      <p class="mx-auto mt-6 max-w-sm p-4 text-center text-sm font-semibold text-red-600 dark:text-red-400">
        {isHttpError(e) ? e.body.message : "Internal Error"}
      </p>
    {/snippet}
  </svelte:boundary>
  </main>
</div>
