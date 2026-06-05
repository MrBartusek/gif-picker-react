export enum ContentFilter {
	HIGH = 'high',
	MEDIUM = 'medium',
	LOW = 'low',
	OFF = 'off',
}

export interface KlipyMediaFormat {
	url: string;
	width: number;
	height: number;
	size: number;
}

export interface KlipyFileVariant {
	gif: KlipyMediaFormat;
	webp?: KlipyMediaFormat;
	jpg?: KlipyMediaFormat;
	mp4?: KlipyMediaFormat;
	webm?: KlipyMediaFormat;
}

export interface KlipyItem {
	id: number;
	slug: string;
	title: string;
	file: {
		hd: KlipyFileVariant;
		md: KlipyFileVariant;
		sm: KlipyFileVariant;
		xs: KlipyFileVariant;
	};
	tags: string[];
	type: string;
	blur_preview?: string;
}

export interface KlipyEnvelope<T> {
	result: boolean;
	data: T;
}

export interface KlipyListData {
	data: KlipyItem[];
	current_page: number;
	per_page: number;
	has_next: boolean;
}

export interface KlipyCategory {
	category: string;
	query: string;
	preview_url: string;
}

export interface KlipyCategoriesData {
	locale: string;
	categories: KlipyCategory[];
}
