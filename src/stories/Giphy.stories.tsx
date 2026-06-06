import { ContentRating, Giphy } from '../providers/giphy';
import { createProviderMeta } from './providerStory';

export default {
	title: 'Providers/Giphy',
	...createProviderMeta((args) => Giphy(import.meta.env.STORYBOOK_GIPHY_TOKEN!, args), {
		rating: {
			options: Object.values(ContentRating),
			control: { type: 'select' },
			table: { category: 'Giphy' },
		},
		lang: {
			control: { type: 'text' },
			table: { category: 'Giphy' },
		},
	}),
	args: {
		rating: ContentRating.G,
	},
};

export { Home, DarkTheme, HomeCategory, Trending } from './providerStory';
