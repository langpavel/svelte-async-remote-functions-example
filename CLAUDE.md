# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit project demonstrating the experimental **remote functions** feature, which allows calling server-side functions directly from client components with automatic form handling and state management. The project implements a todo application with authentication to showcase these capabilities.

## Key Technologies

- **SvelteKit** v2 with experimental remote functions enabled
- **Svelte 5** with runes ($effect, async/await support)
- **TypeScript** with strict mode
- **Zod v4** for validation
- **Vite** for development and building
- **pnpm** as package manager

## Architecture

### Remote Functions Pattern

The core feature demonstrated is SvelteKit's experimental remote functions:

1. **Remote function files** (*.remote.ts): Server-side functions that can be called from client components
   - `src/routes/todos.remote.ts`: Todo CRUD operations
   - `src/routes/login/login.remote.ts`: Authentication logic

2. **Function types**:
   - `query()`: For read operations (like `getTodos()`)
   - `form()`: For form submissions with automatic enhancement (like `addTodo()`, `deleteTodo()`)
   - `command()`: For programmatic calls with validation (like `toggleTodo()`)

3. **Client integration**: Functions are imported and used directly in Svelte components with automatic:
   - Form enhancement (no-JS fallback)
   - Loading states
   - Error handling
   - Optimistic updates via `.updates()` and `.withOverride()`

### Project Structure

- `src/routes/+page.svelte`: Main todo interface demonstrating all remote function patterns
- `src/routes/login/+page.svelte`: Simple login form
- Remote functions handle both server-side logic and client-side state management
- In-memory data storage (todos array) for demonstration purposes

## Development Commands

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Type checking
pnpm run check
pnpm run check:watch

# Code formatting and linting
pnpm run format
pnpm run lint
```

## Configuration Notes

- **Experimental features enabled**: 
  - `experimental.async: true` in svelte.config.js (Svelte 5 async support)
  - `experimental.remoteFunctions: true` in SvelteKit config
- **Package override**: Uses a specific SvelteKit build from pkg.pr.new for remote functions support
- **Zod v4**: Upgraded from v3, note the import path `zod/v4`

## Key Patterns to Follow

When working with remote functions:

1. **Server functions**: Export functions using `query()`, `form()`, or `command()` wrappers
2. **Client usage**: Import and use directly, spread form functions onto `<form>` elements
3. **Optimistic updates**: Use `.updates(query.withOverride(updateFn))` for immediate UI feedback
4. **Error handling**: Remote functions return errors as strings, access via `.error` property
5. **State management**: Query functions return reactive promises that auto-update

## Authentication Flow

Simple cookie-based auth with passphrase "svelte" (case-insensitive). The `checkLoggedIn()` function redirects to `/login` if not authenticated.