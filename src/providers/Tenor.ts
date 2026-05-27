import { ContentFilter } from '../types/TenorTypes';
import { Gif, GifProviderAttribution, GifCategory, GifProvider, RegisterShareContext } from '../types/GifProvider';
import { TenorCategoriesResponse, TenorResult, TenorSearchResponse } from '../types/TenorTypes';

const MEDIA_FILTER = 'gif,tinygif';
const BASE_URL = 'https://tenor.googleapis.com/v2/';
const TENOR_MAX_LIMIT = 50;

class TenorProviderConfig {
	baseUrl?: string;
	clientKey?: string;
	country?: string;
	locale?: string;
	contentFilter?: ContentFilter;
}

export function Tenor(apiKey: string, config?: TenorProviderConfig): GifProvider {
	return new TenorProvider(apiKey, config);
}

class TenorProvider extends GifProvider {
	constructor(
		private apiKey: string,
		private config: TenorProviderConfig = {},
	) {
		super();
	}

	public async getCategories(): Promise<GifCategory[]> {
		const data = await this.fetchApi<TenorCategoriesResponse>('categories', { type: 'featured' });

		return data.tags.map((tag) => ({
			name: tag.searchterm,
			imageUrl: tag.image,
		}));
	}

	public async search(term: string): Promise<Gif[]> {
		const data = await this.fetchApi<TenorSearchResponse>('search', {
			q: term,
			ar_range: 'all',
			limit: TENOR_MAX_LIMIT,
		});

		return data.results.map((r) => this.parseGif(r));
	}

	public async getTrending(): Promise<Gif[]> {
		const data = await this.fetchApi<TenorSearchResponse>('featured', {
			ar_range: 'all',
			limit: TENOR_MAX_LIMIT,
		});

		return data.results.map((r) => this.parseGif(r));
	}

	public async registerShare(gif: Gif, context: RegisterShareContext): Promise<void> {
		await this.fetchApi('registershare', {
			id: gif.id,
			...(context.searchTerm && { q: context.searchTerm }),
		});
	}

	private async fetchApi<T = any>(endpoint: string, extraParams?: Record<string, any>): Promise<T> {
		const url = new URL((this.config.baseUrl ?? BASE_URL) + endpoint);

		url.searchParams.set('key', this.apiKey);
		url.searchParams.set('media_filter', MEDIA_FILTER);

		if (this.config.clientKey) {
			url.searchParams.set('client_key', this.config.clientKey);
		}
		if (this.config.contentFilter) {
			url.searchParams.set('contentfilter', this.config.contentFilter);
		}
		if (this.config.locale) {
			url.searchParams.set('locale', this.config.locale);
		}
		if (this.config.country) {
			url.searchParams.set('country', this.config.country);
		}

		if (extraParams) {
			Object.entries(extraParams).forEach(([k, v]) => url.searchParams.set(k, v));
		}

		const res = await fetch(url.toString());
		return res.json() as Promise<T>;
	}

	public getAttribution(): GifProviderAttribution {
		return { searchPlaceholder: 'Search Tenor' };
	}

	private parseGif(img: TenorResult): Gif {
		const gif = img.media_formats.gif;
		const preview = img.media_formats.tinygif;
		return {
			id: img.id,
			imageUrl: gif.url,
			width: gif.dims[0],
			height: gif.dims[1],
			preview: {
				imageUrl: preview.url,
				width: preview.dims[0],
				height: preview.dims[1],
			},
		};
	}
}
