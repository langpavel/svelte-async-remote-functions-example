<script>
  import { onMount } from "svelte";

  let isDark = $state(false);

  onMount(() => {
    // Check for saved theme preference or default to light mode
    isDark =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  const updateTheme = () => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
    const cl = document.documentElement.classList;
    if (isDark) {
      cl.add("dark");
    } else {
      cl.remove("dark");
    }
  };

  const toggleTheme = () => {
    isDark = !isDark;
  };

  $effect(() => {
    isDark;
    updateTheme();
  });
</script>

<button
  onclick={toggleTheme}
  class="rounded-md bg-gray-100 p-1.5 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
  aria-label="Toggle theme"
>
  {#if isDark}
    <svg class="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
      <path
        fill-rule="evenodd"
        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
        clip-rule="evenodd"
      ></path>
    </svg>
  {:else}
    <svg class="h-4 w-4 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    </svg>
  {/if}
</button>
