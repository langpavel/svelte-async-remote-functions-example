<script>
  import { login } from "./login.remote";
</script>

<div class="max-w-xs mx-auto mt-6 p-4">
  <a href="/" class="inline-block mb-4 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">← Go to Home</a>

  <!-- spreads method=post, onsubmit={handleToNotDoFullPageReload} and action="the login remote form function id" onto the form -->
  <form {...login} class="bg-white dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-600 rounded shadow-sm space-y-3">
    <div>
      <label for="passphrase" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
        Enter the passphrase "Svelte":
      </label>
      <input 
        name="passphrase" 
        autocomplete="off" 
        placeholder="Svelte" 
        class="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    <button 
      type="submit"
      class="w-full px-3 py-1.5 text-sm bg-blue-600 dark:bg-blue-700 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
    >
      Login
    </button>
    {#if login.result}
      <p class="text-red-600 dark:text-red-400 text-xs">{login.result}</p>
    {/if}
  </form>
</div>
