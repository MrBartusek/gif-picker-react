import { GifProvider, GifProviderAttribution } from '../../types/GifProvider';
import { Gif, GifCategory, GifProviderName } from '../../types/types';
import {
	ContentRating,
	GiphyCategoriesResponse,
	GiphyGif,
	GiphyListResponse,
	GiphyMeta,
} from './giphy.types';
import poweredByGiphyOnLight from './assets/powered-by-giphy-on-light.png';
import poweredByGiphyOnDark from './assets/powered-by-giphy-on-dark.png';

const BASE_URL = 'https://api.giphy.com/v1/';
const GIPHY_MAX_LIMIT = 50;
const GIPHY_MAX_QUERY_LENGTH = 50;

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
		this.baseUrl = (config.baseUrl ?? BASE_URL).replace(/\/+$/, '');
	}

	public async getCategories(): Promise<GifCategory[]> {
		const params: Record<string, string> = {};
		if (this.config.lang) {
			params.lang = this.config.lang;
		}

		const data = await this.fetchApi<GiphyCategoriesResponse>('/gifs/categories', params);

		return data.data
			.map((category): GifCategory | null => {
				const cover = category.gif?.images?.fixed_width?.url;
				if (!cover) {
					return null;
				}
				return {
					name: category.name,
					searchTerm: category.name,
					imageUrl: cover,
				};
			})
			.filter((category): category is GifCategory => category !== null);
	}

	public async search(term: string): Promise<Gif[]> {
		const data = await this.fetchApi<GiphyListResponse>('/gifs/search', {
			q: term.slice(0, GIPHY_MAX_QUERY_LENGTH),
			limit: GIPHY_MAX_LIMIT,
			...this.buildParams(),
		});

		return this.parseGifs(data.data);
	}

	public async getTrending(): Promise<Gif[]> {
		const data = await this.fetchApi<GiphyListResponse>('/gifs/trending', {
			limit: GIPHY_MAX_LIMIT,
			...this.buildParams(),
		});

		return this.parseGifs(data.data);
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
		const url = new URL(`${this.baseUrl}${endpoint}`);

		url.searchParams.set('api_key', this.apiKey);

		if (params) {
			Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
		}

		const res = await fetch(url.toString());
		if (!res.ok) {
			throw new Error(`Giphy API request failed (${res.status} ${res.statusText})`);
		}

		const body: T & { meta?: GiphyMeta } = await res.json();
		if (!body.meta || !body.meta.response_id) {
			throw new Error('Giphy API returned a empty response');
		}

		return body;
	}

	private parseGifs(items: GiphyGif[]): Gif<GiphyGif>[] {
		return items
			.map((item) => this.parseGif(item))
			.filter((gif): gif is Gif<GiphyGif> => gif !== null);
	}

	private parseGif(item: GiphyGif): Gif<GiphyGif> | null {
		const full = item.images.original;
		const preview = item.images.fixed_width;

		if (!full || !preview) {
			return null;
		}

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
