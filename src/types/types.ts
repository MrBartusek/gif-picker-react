export type Awaitable<T> = T | PromiseLike<T>;

export type GifCategory = {
	imageUrl: string;

	name: string;

	/** Term searched when the category is clicked. Falls back to `name`. */
	searchTerm?: string;
};

export type GifPreview = {
	imageUrl: string;
	height: number;
	width: number;
};

export type Gif = {
	id: string;
	imageUrl: string;
	height: number;
	width: number;
	description?: string;
	preview?: GifPreview;
};
