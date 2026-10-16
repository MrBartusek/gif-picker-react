import { createGifSnapClient, type GifSnapClientOptions, type GifSnapGif } from '@rowix/gifsnap-js';
import type { Gif, GifProvider } from 'gif-picker-react';

export interface GifSnapProviderOptions extends GifSnapClientOptions {
	/** Results per search, from 1 to 50. This picker has no page/cursor hook. */
	limit?: number;
}

function mapResults(items: GifSnapGif[]): Gif<GifSnapGif>[] {
	const ids = new Set<string>();
	const urls = new Set<string>();
	const aliases = new Set<string>();
	const results: Gif<GifSnapGif>[] = [];

	for (const item of items) {
		const duplicate =
			ids.has(item.id) ||
			urls.has(item.url) ||
			(item.content_id !== undefined && aliases.has(item.content_id));
		ids.add(item.id);
		urls.add(item.url);
		if (item.content_id !== undefined) aliases.add(item.content_id);
		if (duplicate) continue;

		const width = item.width || 240;
		const height = item.height || 180;
		results.push({
			id: item.id,
			imageUrl: item.url,
			width,
			height,
			description: item.title,
			// preview_url may be a still poster. Use the animated asset for both
			// display and selection, preserving the complete URL and its query.
			preview: { imageUrl: item.url, width, height },
			provider: 'gifsnap',
			raw: item,
		});
	}
	return results;
}

/** Example adapter for the public GifSnap API. */
export function createGifSnapProvider(options: GifSnapProviderOptions = {}): GifProvider {
	const { limit = 24, ...clientOptions } = options;
	if (!Number.isSafeInteger(limit) || limit < 1 || limit > 50) {
		throw new RangeError('limit must be an integer from 1 to 50.');
	}
	const client = createGifSnapClient(clientOptions);
	const getTrending = async () => mapResults((await client.trending({ limit })).data);

	return {
		getTrending,
		async search(term) {
			if (!term.trim()) return getTrending();
			return mapResults((await client.search({ query: term, limit })).data);
		},
		// Avoid inventing a categories endpoint or issuing multiple searches
		// just to populate the home screen. Trending remains available.
		getCategories: () => [],
		getAttribution: () => ({ searchPlaceholder: 'Search GifSnap' }),
	};
}
