export enum ContentRating {
	G = 'g',
	PG = 'pg',
	PG_13 = 'pg-13',
	R = 'r',
}

export interface GiphyMediaFormat {
	url: string;
	width: string;
	height: string;
	size?: string;
	mp4?: string;
	mp4_size?: string;
	webp?: string;
	webp_size?: string;
	frames?: string;
	hash?: string;
}

export interface GiphyImages {
	original?: GiphyMediaFormat;
	fixed_width?: GiphyMediaFormat;
	fixed_height?: GiphyMediaFormat;
	downsized?: GiphyMediaFormat;
	preview_gif?: GiphyMediaFormat;
	[key: string]: GiphyMediaFormat | undefined;
}

export interface GiphyAnalyticsEvent {
	url: string;
}

export interface GiphyAnalytics {
	onload?: GiphyAnalyticsEvent;
	onclick?: GiphyAnalyticsEvent;
	onsent?: GiphyAnalyticsEvent;
}

export interface GiphyGif {
	type: string;
	id: string;
	slug: string;
	url: string;
	bitly_url: string;
	bitly_gif_url: string;
	embed_url: string;
	content_url: string;
	title: string;
	rating: ContentRating;
	username: string;
	source: string;
	source_tld: string;
	source_post_url: string;
	is_sticker: number;
	import_datetime: string;
	trending_datetime: string;
	user?: any;
	images: GiphyImages;
	analytics?: GiphyAnalytics;
	analytics_response_payload?: string;
}

export interface GiphyMeta {
	status: number;
	msg: string;
	response_id: string;
}

export interface GiphyPagination {
	total_count: number;
	count: number;
	offset: number;
}

export interface GiphyListResponse {
	data: GiphyGif[];
	pagination: GiphyPagination;
	meta: GiphyMeta;
}

export interface GiphyCategory {
	name: string;
	name_encoded: string;
	gif?: GiphyGif;
	subcategories: any[];
}

export interface GiphyCategoriesResponse {
	data: GiphyCategory[];
	pagination: GiphyPagination;
	meta: GiphyMeta;
}
