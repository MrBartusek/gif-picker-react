import { GifProvider, GifProviderAttribution } from '../../types/GifProvider';
import { Gif, GifCategory, GifProviderName } from '../../types/types';
import { ContentRating, GiphyCategoriesResponse, GiphyGif, GiphyListResponse } from './giphy.types';
import poweredByGiphyOnLight from './assets/powered-by-giphy-on-light.png';
import poweredByGiphyOnDark from './assets/powered-by-giphy-on-dark.png';

const BASE_URL = 'https://api.giphy.com/v1/';
const GIPHY_MAX_LIMIT = 50;

export type GiphyProviderConfig = {
	baseUrl?: string;
	lang?: string;
	rating?: ContentRating;
};

export function Giphy(apiKey: string, config?: GiphyProviderConfig): GifProvider {
	return new GiphyProvider(apiKey, config);
}

class GiphyProvider implements GifProvider {
	private readonly baseUrl: string;

	constructor(
		private apiKey: string,
		private config: GiphyProviderConfig = {},
	) {
		this.baseUrl = (config.baseUrl ?? BASE_URL).replace(/\/+$/, '') + '/';
	}

	public async getCategories(): Promise<GifCategory[]> {
		const data = await this.fetchApi<GiphyCategoriesResponse>('/gifs/categories');

		return data.data.map((category) => ({
			name: category.name,
			searchTerm: category.name,
			imageUrl: category.gif.images.fixed_width.url,
		}));
	}

	public async search(term: string): Promise<Gif[]> {
		const data = await this.fetchApi<GiphyListResponse>('/gifs/search', {
			q: term,
			limit: GIPHY_MAX_LIMIT,
			...this.buildParams(),
		});

		return data.data.map((item) => this.parseGif(item));
	}

	public async getTrending(): Promise<Gif[]> {
		const data = await this.fetchApi<GiphyListResponse>('/gifs/trending', {
			limit: GIPHY_MAX_LIMIT,
			...this.buildParams(),
		});

		return data.data.map((item) => this.parseGif(item));
	}

	public getAttribution(): GifProviderAttribution {
		return {
			searchPlaceholder: 'Search GIPHY',
			branding: {
				logo: poweredByGiphyOnLight,
				logoDark: poweredByGiphyOnDark,
				alt: 'Powered by GIPHY',
				href: 'https://giphy.com',
			},
		};
	}

	private buildParams(): Record<string, string> {
		const params: Record<string, string> = {};

		if (this.config.rating) {
			params.rating = this.config.rating;
		}

		if (this.config.lang) {
			params.lang = this.config.lang;
		}

		return params;
	}

	private async fetchApi<T = any>(endpoint: string, params?: Record<string, any>): Promise<T> {
		const url = new URL(endpoint, this.baseUrl);

		url.searchParams.set('api_key', this.apiKey);

		if (params) {
			Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
		}

		const res = await fetch(url.toString());
		if (!res.ok) {
			throw new Error(`Giphy API request failed (${res.status} ${res.statusText})`);
		}

		return res.json() as Promise<T>;
	}

	private parseGif(item: GiphyGif): Gif<GiphyGif> {
		const full = item.images.original;
		const preview = item.images.fixed_width;

		return {
			id: item.id,
			imageUrl: full.url,
			width: Number(full.width),
			height: Number(full.height),
			description: item.title,
			preview: {
				imageUrl: preview.url,
				width: Number(preview.width),
				height: Number(preview.height),
			},
			provider: GifProviderName.GIPHY,
			raw: item,
		};
	}
}
