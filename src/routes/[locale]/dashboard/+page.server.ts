import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { deleteSession } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) {
		redirect(302, `/${params.locale}/login`);
	}
	return { user: locals.user };
};

export const actions: Actions = {
	logout: async ({ cookies, params }) => {
		const sessionId = cookies.get('session');
		if (sessionId) {
			deleteSession(sessionId);
			cookies.delete('session', { path: '/' });
		}
		redirect(302, `/${params.locale}/login`);
	}
};
