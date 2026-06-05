import { ContentFilter, Tenor } from '../providers/tenor';
import { createProviderMeta } from './providerStory';

export default {
	title: 'Providers/Tenor',
	...createProviderMeta((args) => Tenor(import.meta.env.STORYBOOK_TENOR_TOKEN!, args), {
		contentFilter: {
			options: Object.values(ContentFilter),
			control: { type: 'select' },
			table: { category: 'Tenor' },
		},
		country: {
			control: { type: 'text' },
			table: { category: 'Tenor' },
		},
		locale: {
			control: { type: 'text' },
			table: { category: 'Tenor' },
		},
	}),
	args: {
		contentFilter: ContentFilter.OFF,
	},
};

export { Home, DarkTheme, HomeCategory, Trending } from './providerStory';
