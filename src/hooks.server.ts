import type { Handle } from '@sveltejs/kit';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	const supportedLocales = ['en', 'id'];

	const hasLocale = supportedLocales.some(
		(locale) =>
			pathname === `/${locale}` ||
			pathname.startsWith(`/${locale}/`)
	);

	// redirect jika belum ada locale
	if (!hasLocale) {
		return Response.redirect(
			new URL(`/en${pathname}`, event.url),
			302
		);
	}

	// jalankan paraglide middleware
	return handleParaglide({ event, resolve });
};
