import { GifProvider, GifProviderAttribution, RegisterShareContext } from '../../types/GifProvider';
import { Gif, GifCategory } from '../../types/types';
import {
	ContentFilter,
	KlipyCategoriesData,
	KlipyEnvelope,
	KlipyItem,
	KlipyListData,
} from './klipy.types';

const BASE_URL = 'https://api.klipy.com/api/v1/';
const FORMAT_FILTER = 'gif';
const KLIPY_MAX_PER_PAGE = 50;

export type KlipyProviderConfig = {
	baseUrl?: string;
	customerId?: string;
	locale?: string;
	contentFilter?: ContentFilter;
};

export function Klipy(appKey: string, config?: KlipyProviderConfig): GifProvider {
	return new KlipyProvider(appKey, config);
}

class KlipyProvider implements GifProvider {
	constructor(
		private appKey: string,
		private config: KlipyProviderConfig = {},
	) {}

	public async getCategories(): Promise<GifCategory[]> {
		const data = await this.fetchApi<KlipyCategoriesData>('categories');

		return data.categories.map((category) => ({
			name: category.query,
			imageUrl: category.preview_url,
		}));
	}

	public async search(term: string): Promise<Gif[]> {
		const data = await this.fetchApi<KlipyListData>('search', {
			q: term,
			page: 1,
			per_page: KLIPY_MAX_PER_PAGE,
			format_filter: FORMAT_FILTER,
		});

		return data.data.map((item) => this.parseGif(item));
	}

	public async getTrending(): Promise<Gif[]> {
		const data = await this.fetchApi<KlipyListData>('trending', {
			page: 1,
			per_page: KLIPY_MAX_PER_PAGE,
			format_filter: FORMAT_FILTER,
		});

		return data.data.map((item) => this.parseGif(item));
	}

	public async registerShare(gif: Gif, context: RegisterShareContext): Promise<void> {
		const body: Record<string, string> = { q: context.searchTerm ?? '' };
		if (this.config.customerId) {
			body.customer_id = this.config.customerId;
		}

		await this.fetchApi(`share/${gif.id}`, undefined, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
	}

	private async fetchApi<T = any>(
		endpoint: string,
		params?: Record<string, any>,
		init?: RequestInit,
	): Promise<T> {
		const baseUrl = this.config.baseUrl ?? BASE_URL;
		const url = new URL(`${baseUrl}${this.appKey}/gifs/${endpoint}`);

		if (this.config.locale) {
			url.searchParams.set('locale', this.config.locale);
		}
		if (this.config.contentFilter) {
			url.searchParams.set('content_filter', this.config.contentFilter);
		}
		if (this.config.customerId) {
			url.searchParams.set('customer_id', this.config.customerId);
		}

		if (params) {
			Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
		}

		const res = await fetch(url.toString(), init);
		if (!res.ok) {
			throw new Error(`Klipy API request failed (${res.status} ${res.statusText})`);
		}
		const body = (await res.json()) as KlipyEnvelope<T>;
		return body.data;
	}

	public getAttribution(): GifProviderAttribution {
		return { searchPlaceholder: 'Search KLIPY' };
	}

	private parseGif(item: KlipyItem): Gif {
		const gif = item.file.md.gif;
		const preview = item.file.sm.gif;
		return {
			id: item.slug,
			imageUrl: gif.url,
			width: gif.width,
			height: gif.height,
			description: item.title,
			preview: {
				imageUrl: preview.url,
				width: preview.width,
				height: preview.height,
			},
		};
	}
}
