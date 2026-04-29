import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { validateCredentials, createSession } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals, params }) => {
	if (locals.user) {
		redirect(302, `/${params.locale}/dashboard`);
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies, params }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString().trim() ?? '';
		const password = data.get('password')?.toString() ?? '';

		if (!username || !password) {
			return fail(400, { error: 'fields_required', username });
		}

		const user = validateCredentials(username, password);
		if (!user) {
			return fail(401, { error: 'invalid_credentials', username });
		}

		const sessionId = createSession(user.id);
		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24 * 7
		});

		redirect(302, `/${params.locale}/dashboard`);
	}
};
