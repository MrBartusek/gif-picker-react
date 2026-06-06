import { GifProvider, GifProviderAttribution, GifEventContext } from '../../types/GifProvider';
import { Gif, GifCategory, GifProviderName } from '../../types/types';
import {
	ContentFilter,
	KlipyCategoriesData,
	KlipyEnvelope,
	KlipyItem,
	KlipyItemType,
	KlipyListData,
	KlipyQuality,
} from './klipy.types';
import poweredByKlipyGray from './assets/powered-by-klipy-gray.svg';
import poweredByKlipyWhite from './assets/powered-by-klipy-white.svg';

const BASE_URL = 'https://api.klipy.com/api/v1/';
const FORMAT_FILTER = 'gif';
const KLIPY_MAX_PER_PAGE = 50;
const DEFAULT_QUALITY = KlipyQuality.MD;
const DEFAULT_PREVIEW_QUALITY = KlipyQuality.SM;

export type KlipyProviderConfig = {
	baseUrl?: string;
	customerId?: string;
	locale?: string;
	contentFilter?: ContentFilter;
	quality?: KlipyQuality;
	previewQuality?: KlipyQuality;
	showBranding?: boolean;
};

export function Klipy(appKey: string, config?: KlipyProviderConfig): GifProvider {
	return new KlipyProvider(appKey, config);
}

class KlipyProvider implements GifProvider {
	private readonly baseUrl: string;

	constructor(
		private appKey: string,
		private config: KlipyProviderConfig = {},
	) {
		this.baseUrl = (config.baseUrl ?? BASE_URL).replace(/\/+$/, '') + '/';
	}

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
			...this.buildParams(),
		});

		return this.parseGifs(data.data);
	}

	public async getTrending(): Promise<Gif[]> {
		const data = await this.fetchApi<KlipyListData>('trending', {
			page: 1,
			per_page: KLIPY_MAX_PER_PAGE,
			format_filter: FORMAT_FILTER,
			...this.buildParams(),
		});

		return this.parseGifs(data.data);
	}

	public async onClick(gif: Gif, context: GifEventContext): Promise<void> {
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
		const attribution: GifProviderAttribution = {
			searchPlaceholder: 'Search KLIPY',
		};

		if (this.config.showBranding) {
			attribution.branding = {
				logo: poweredByKlipyGray,
				logoDark: poweredByKlipyWhite,
				alt: 'Powered by KLIPY',
				href: 'https://klipy.com',
			};
		}

		return attribution;
	}

	private buildParams(): Record<string, string> {
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
		const url = new URL(`${this.appKey}/gifs/${endpoint}`, this.baseUrl);

		if (params) {
			Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
		}

		const res = await fetch(url.toString(), init);
		if (!res.ok) {
			throw new Error(`Klipy API request failed (${res.status} ${res.statusText})`);
		}

		const body: KlipyEnvelope<T> = await res.json();
		if (!body.result) {
			throw new Error('Klipy API request failed (result: false)');
		}

		return body.data;
	}

	private parseGifs(items: KlipyItem[]): Gif<KlipyItem>[] {
		return items
			.map((item) => this.parseGif(item))
			.filter((gif): gif is Gif<KlipyItem> => gif !== null);
	}

	private parseGif(item: KlipyItem): Gif<KlipyItem> | null {
		if (item.type !== KlipyItemType.GIF) {
			return null;
		}

		const fullQuality = this.config.quality ?? DEFAULT_QUALITY;
		const previewQuality = this.config.previewQuality ?? DEFAULT_PREVIEW_QUALITY;

		const full = item.file[fullQuality].gif;
		const preview = item.file[previewQuality].gif;
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
			provider: GifProviderName.KLIPY,
			raw: item,
		};
	}
}
