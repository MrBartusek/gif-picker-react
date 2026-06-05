import { Awaitable, Gif, GifCategory } from './types';

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

export type RegisterShareContext = {
	searchTerm?: string;
};

export type GifProviderAttribution = {
	searchPlaceholder: string;
};
