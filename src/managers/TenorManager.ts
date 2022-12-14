import { AxiosResponse, Axios } from 'axios';
import { ContentFilter, TenorImage } from '../types/exposedTypes';

const MEDIA_FILTER = 'gif';

export interface TenorCategory {
	image: string;
	name: string;
}

export interface TenorSearchResult {
	next: string;
	images: TenorImage[];
}

class TenorManager {
	private apiKey: string;
	private clientKey: string;
	private country: string;
	private locale: string;
	private contentFilter: ContentFilter;
	private client: Axios;

	constructor(
		apiKey: string,
		clientKey: string,
		country: string,
		locale: string,
		contentFilter: ContentFilter
	) {
		this.apiKey = apiKey;
		this.clientKey = clientKey;
		this.country = country;
		this.locale = locale;
		this.contentFilter = contentFilter;
		this.client = new Axios({
			baseURL: 'https://tenor.googleapis.com/v2/',
			params: {
				'key': this.apiKey,
				'client_key': this.clientKey,
				'contentfilter': this.contentFilter,
				'media_filter': MEDIA_FILTER,
				'locale': this.locale,
				'country': this.country
			},
			// This should happen automatically but doesn't for some reason
			transformResponse: [ (data, headers) => {
				return JSON.parse(data);
			} ]
		});
	}

	private async callApi(endpoint: string, params: any): Promise<AxiosResponse<any, any>> {
		return this.client.get(endpoint, { params })
			.then((res) => res.data)
			.catch((error) => {
				console.error(error);
				console.error('[gif-picker-react] Failed to fetch data from Tenor API');
			});
	}

	public async categories(): Promise<TenorCategory[]> {
		return this.callApi('categories', {
			type: 'featured'
		})
			.then((data: any) => {
				const tags = data.tags;
				return tags.map((tag: any) => ({
					name: tag['searchterm'],
					image: tag.image
				}));
			});
	}

	public async search(term: string): Promise<TenorSearchResult> {
		return this.callApi('search', {
			q: term,
			'ar_range': 'all'
		})
			.then((data: any) => {
				const results = data.results;
				const images = results.map((img: any) => {
					const gif = img['media_formats']['gif'];
					return {
						id: img.id,
						tenorUrl: img['itemurl'] ,
						shortTenorUrl: img.url,
						description: img['content_description'],
						createdAt: new Date(img.created * 1000),
						tags: img.tags,
						url: gif.url,
						width: gif.dims[0],
						height: gif.dims[1]
					};
				});
				return {
					next: data.next,
					images: images
				};
			});
	}
}

export default TenorManager;
