import { GifProvider, GifProviderAttribution, RegisterShareContext } from '../../types/GifProvider';
import { Gif, GifCategory } from '../../types/types';
import {
	ContentFilter,
	KlipyCategoriesData,
	KlipyEnvelope,
	KlipyItem,
	KlipyListData,
	KlipyQuality,
} from './klipy.types';

const BASE_URL = 'https://api.klipy.com/api/v1/';
const FORMAT_FILTER = 'gif';
const KLIPY_MAX_PER_PAGE = 50;
const PREVIEW_SIZE = KlipyQuality.SM;
const DEFAULT_QUALITY = KlipyQuality.MD;

export type KlipyProviderConfig = {
	baseUrl?: string;
	customerId?: string;
	locale?: string;
	contentFilter?: ContentFilter;
	quality?: KlipyQuality;
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
		const params: Record<string, string> = {};
		if (this.config.locale) {
			params.locale = this.config.locale;
		}

		const data = await this.fetchApi<KlipyCategoriesData>('categories', params);

		return data.categories.map((category) => ({
			name: category.category,
			searchTerm: category.query,
			imageUrl: category.preview_url,
		}));
	}

	public async search(term: string): Promise<Gif[]> {
		const data = await this.fetchApi<KlipyListData>('search', {
			q: term,
			page: 1,
			per_page: KLIPY_MAX_PER_PAGE,
			format_filter: FORMAT_FILTER,
			...this.commonParams(),
		});

		return this.parseGifs(data.data);
	}

	public async getTrending(): Promise<Gif[]> {
		const data = await this.fetchApi<KlipyListData>('trending', {
			page: 1,
			per_page: KLIPY_MAX_PER_PAGE,
			format_filter: FORMAT_FILTER,
			...this.commonParams(),
		});

		return this.parseGifs(data.data);
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

	public getAttribution(): GifProviderAttribution {
		return { searchPlaceholder: 'Search KLIPY' };
	}

	private commonParams(): Record<string, string> {
		const params: Record<string, string> = {};
		if (this.config.locale) {
			params.locale = this.config.locale;
		}
		if (this.config.contentFilter) {
			params.content_filter = this.config.contentFilter;
		}
		if (this.config.customerId) {
			params.customer_id = this.config.customerId;
		}
		return params;
	}

	private async fetchApi<T = any>(
		endpoint: string,
		params?: Record<string, any>,
		init?: RequestInit,
	): Promise<T> {
		const baseUrl = this.config.baseUrl ?? BASE_URL;
		const url = new URL(`${baseUrl}${this.appKey}/gifs/${endpoint}`);

		if (params) {
			Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
		}

		const res = await fetch(url.toString(), init);
		if (!res.ok) {
			throw new Error(`Klipy API request failed (${res.status} ${res.statusText})`);
		}

		const body = (await res.json()) as KlipyEnvelope<T>;
		if (!body.result) {
			throw new Error('Klipy API request failed (result: false)');
		}
		return body.data;
	}

	private parseGifs(items: KlipyItem[]): Gif[] {
		return items.map((item) => this.parseGif(item)).filter((gif): gif is Gif => gif !== null);
	}

	private parseGif(item: KlipyItem): Gif | null {
		if (item.type !== 'gif') {
			return null;
		}

		const full = item.file?.[this.config.quality ?? DEFAULT_QUALITY]?.gif;
		const preview = item.file?.[PREVIEW_SIZE]?.gif;
		if (!full || !preview) {
			return null;
		}

		return {
			id: item.slug,
			imageUrl: full.url,
			width: full.width,
			height: full.height,
			description: item.title,
			preview: {
				imageUrl: preview.url,
				width: preview.width,
				height: preview.height,
			},
		};
	}
}
