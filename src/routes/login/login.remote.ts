import { form, getRequestEvent, query } from '$app/server';
import { redirect } from '@sveltejs/kit';

export const login = form((data) => {
	const event = getRequestEvent();
	const passphrase = data.get('passphrase') as string;
	if (passphrase.toLowerCase() === 'svelte') {
		event.cookies.set('loggedIn', 'true', { path: '/' });
		redirect(303, '/');
	} else {
		return 'Incorrect passphrase.';
	}
});

export const checkLoggedIn = query(() => {
	const event = getRequestEvent();
	if (event.cookies.get('loggedIn') !== 'true') {
		redirect(303, '/login');
	}
});
