import { ContentFilter, Klipy, KlipyQuality } from '../providers/klipy';
import { createProviderMeta } from './providerStory';

export default {
	title: 'Providers/Klipy',
	...createProviderMeta((args) => Klipy(import.meta.env.STORYBOOK_KLIPY_TOKEN!, args), {
		contentFilter: {
			options: Object.values(ContentFilter),
			control: { type: 'select' },
			table: { category: 'Klipy' },
		},
		quality: {
			options: Object.values(KlipyQuality),
			control: { type: 'select' },
			table: { category: 'Klipy' },
		},
		previewQuality: {
			options: Object.values(KlipyQuality),
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
		showBranding: {
			control: { type: 'boolean' },
			table: { category: 'Klipy' },
		},
	}),
	args: {
		contentFilter: ContentFilter.OFF,
		quality: KlipyQuality.MD,
		previewQuality: KlipyQuality.SM,
		showBranding: true,
	},
};

export { Home, DarkTheme, HomeCategory, Trending } from './providerStory';
