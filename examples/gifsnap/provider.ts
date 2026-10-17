import { createGifSnapClient, type GifSnapClientOptions, type GifSnapGif } from '@rowix/gifsnap-js';
import type { Gif, GifProvider } from 'gif-picker-react';

export interface GifSnapProviderOptions extends GifSnapClientOptions {
	/** Results per search, from 1 to 50. This picker has no page/cursor hook. */
	limit?: number;
}

// SDK 0.1.0 preserves additional API fields as unknown. Validate the optional
// rendition here so the example works with that published SDK version.
function imagePreview(value: unknown): Gif['preview'] | undefined {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
	const preview = value as Record<string, unknown>;
	if (
		preview.animated !== true ||
		typeof preview.url !== 'string' ||
		(preview.mime_type !== 'image/gif' && preview.mime_type !== 'image/webp') ||
		typeof preview.width !== 'number' ||
		typeof preview.height !== 'number' ||
		![preview.width, preview.height].every((n) => Number.isSafeInteger(n) && n > 0 && n <= 480) ||
		(preview.byte_size !== undefined &&
			!(
				typeof preview.byte_size === 'number' &&
				Number.isSafeInteger(preview.byte_size) &&
				preview.byte_size > 0 &&
				preview.byte_size <= 524288
			))
	) {
		return undefined;
	}
	try {
		const url = new URL(preview.url);
		if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password)
			return undefined;
		const extension = url.pathname.toLowerCase().match(/\.[a-z0-9]+$/)?.[0];
		const expectedExtension = preview.mime_type === 'image/gif' ? '.gif' : '.webp';
		if (extension && extension !== expectedExtension) return undefined;
	} catch {
		return undefined;
	}
	return { imageUrl: preview.url, width: preview.width, height: preview.height };
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
			// Keep selection on the original. Legacy preview_url can be a still
			// poster, and this image-only picker cannot display video renditions.
			preview: imagePreview(item.animated_preview) ?? { imageUrl: item.url, width, height },
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
