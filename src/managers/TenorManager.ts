import { ContentFilter, TenorImage } from '../types/exposedTypes';

const MEDIA_FILTER = 'gif,tinygif';
const BASE_URL = 'https://tenor.googleapis.com/v2/';

export interface TenorCategory {
	image: string;
	name: string;
}

export interface TenorResult {
	next: string;
	images: TenorImage[];
}

class TenorManager {
	private apiKey: string;
	private clientKey: string;
	private country: string;
	private locale: string;
	private contentFilter: ContentFilter;

	constructor(
		apiKey: string,
		clientKey: string,
		country: string,
		locale: string,
		contentFilter: ContentFilter,
	) {
		this.apiKey = apiKey;
		this.clientKey = clientKey;
		this.country = country;
		this.locale = locale;
		this.contentFilter = contentFilter;
	}

	private async callApi(endpoint: string, params?: { [key: string]: any }): Promise<Response> {
		const urlParams = new URLSearchParams({
			key: this.apiKey,
			client_key: this.clientKey,
			contentfilter: this.contentFilter,
			media_filter: MEDIA_FILTER,
			locale: this.locale,
			country: this.country,
			...params,
		});
		const url = BASE_URL + endpoint + '?' + urlParams;
		return fetch(url)
			.then((res) => {
				if (!res.ok) {
					console.error(res);
					console.error('[gif-picker-react] Failed to fetch data from Tenor API');
				}
				return res;
			})
			.then((res) => res.json())
			.catch((error) => {
				console.error(error);
				console.error('[gif-picker-react] Failed to fetch data from Tenor API');
			});
	}

	private praseResult(img: any): TenorImage {
		const preview = img['media_formats']['tinygif'];
		const gif = img['media_formats']['gif'];

		return {
			id: img.id,
			tenorUrl: img['itemurl'],
			shortTenorUrl: img.url,
			description: img['content_description'],
			createdAt: new Date(img.created * 1000),
			tags: img.tags,
			url: gif.url,
			width: gif.dims[0],
			height: gif.dims[1],
			preview: {
				url: preview.url,
				width: preview.dims[0],
				height: preview.dims[1],
			},
		};
	}

	public async categories(): Promise<TenorCategory[]> {
		return this.callApi('categories', {
			type: 'featured',
		}).then((data: any) => {
			const tags = data.tags;
			return tags.map((tag: any) => ({
				name: tag['searchterm'],
				image: tag.image,
			}));
		});
	}

	public async search(term: string, limit = 50): Promise<TenorResult> {
		return this.callApi('search', {
			q: term,
			ar_range: 'all',
			limit,
		}).then((data: any) => {
			const results = data.results;
			const images = results.map(this.praseResult);
			return {
				next: data.next,
				images: images,
			};
		});
	}

	public async trending(limit = 50): Promise<TenorResult> {
		return this.callApi('featured', {
			ar_range: 'all',
			limit,
		}).then((data: any) => {
			const results = data.results;
			const images = results.map(this.praseResult);
			return {
				next: data.next,
				images: images,
			};
		});
	}

	public async registerShare(image: TenorImage, searchTerm?: string): Promise<void> {
		const params: any = { id: image.id };
		if (searchTerm) params['q'] = searchTerm;
		await this.callApi('registershare', params);
		return;
	}
}

export default TenorManager;
