import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { getUser } from '$lib/server/auth';

const PROTECTED_PATHS = ['/dashboard'];

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');
	event.locals.user = sessionId ? (getUser(sessionId) ?? null) : null;
	return resolve(event);
};

const handleGuard: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const locale = pathname.split('/')[1] || 'en';
	const isProtected = PROTECTED_PATHS.some((p) => pathname.includes(p));
	const isLogin = pathname.includes('/login');

	if (isProtected && !event.locals.user) {
		redirect(302, `/${locale}/login`);
	}

	if (isLogin && event.locals.user) {
		redirect(302, `/${locale}/dashboard`);
	}

	return resolve(event);
};

const handleLocale: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;
	const supportedLocales = ['en', 'id'];

	const hasLocale = supportedLocales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
	);

	if (!hasLocale) {
		return Response.redirect(new URL(`/en${pathname}`, event.url), 302);
	}

	return paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;
		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});
};

export const handle = sequence(handleAuth, handleGuard, handleLocale);
