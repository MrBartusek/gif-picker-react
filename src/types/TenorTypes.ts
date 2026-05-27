export interface TenorMediaFormat {
	url: string;
	dims: [number, number];
	duration: number;
	size: number;
}

export interface TenorResult {
	id: string;
	title: string;
	content_description: string;
	itemurl: string;
	url: string;
	tags: string[];
	created: number;
	media_formats: {
		gif: TenorMediaFormat;
		tinygif: TenorMediaFormat;
	};
}

export interface TenorSearchResponse {
	results: TenorResult[];
	next: string;
}

export interface TenorTag {
	searchterm: string;
	path: string;
	image: string;
	name: string;
}

export interface TenorCategoriesResponse {
	tags: TenorTag[];
}
