import { ContentFilter, Klipy } from '../providers/klipy';
import { createProviderMeta } from './providerStory';

export default {
	title: 'Providers/Klipy',
	...createProviderMeta((args) => Klipy(process.env.STORYBOOK_KLIPY_TOKEN!, args), {
		contentFilter: {
			options: Object.values(ContentFilter),
			control: { type: 'select' },
			table: { category: 'Klipy' },
		},
		locale: {
			control: { type: 'text' },
			table: { category: 'Klipy' },
		},
		customerId: {
			control: { type: 'text' },
			table: { category: 'Klipy' },
		},
	}),
	args: {
		contentFilter: ContentFilter.OFF,
	},
};

export { Home, DarkTheme, HomeCategory, Trending } from './providerStory';
