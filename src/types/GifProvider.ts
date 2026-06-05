import { Awaitable, Gif, GifCategory } from './types';

export interface GifProvider {
	/**
	 * Fetches list of currently featured, trending or home page GIFs
	 */
	getTrending(): Awaitable<Gif[]>;

	/**
	 * Fetches most popular GIFs categories with their cover images
	 */
	getCategories(): Awaitable<GifCategory[]>;

	/**
	 * Searches GIFs by user-provided search term
	 */
	search(term: string): Awaitable<Gif[]>;

	/**
	 * If provider supports it, invoked after gif is clicked. This may
	 * be required by provider for analytics.
	 */
	registerShare?(gif: Gif, context: RegisterShareContext): Awaitable<void>;

	/**
	 * Provides configuration of required attribution rules for
	 * specific provider.
	 */
	getAttribution?(): Partial<GifProviderAttribution>;
}

export type RegisterShareContext = {
	searchTerm?: string;
};

export type GifProviderAttribution = {
	searchPlaceholder: string;
};
