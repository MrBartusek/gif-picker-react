type Awaitable<T> = T | PromiseLike<T>;

export type GifCategory = {
	imageUrl: string;
	name: string;
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

export type RegisterShareContext = {
	searchTerm?: string;
};

export type GifProviderAttribution = {
	searchPlaceholder: string;
};

export abstract class GifProvider {
	abstract getTrending(): Awaitable<Gif[]>;
	abstract getCategories(): Awaitable<GifCategory[]>;
	abstract search(term: string): Awaitable<Gif[]>;

	registerShare(_gif: Gif, _context: RegisterShareContext): Awaitable<void> {
		return;
	}

	getAttribution(): GifProviderAttribution {
		return { searchPlaceholder: 'Search GIFs' };
	}
}
