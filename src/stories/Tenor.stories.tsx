import { Tenor } from '../providers/tenor';
import { createProviderMeta } from './providerStory';

export default {
	title: 'Providers/Tenor',
	...createProviderMeta(() => Tenor(process.env.STORYBOOK_TENOR_TOKEN!)),
};

export { Home, DarkTheme, HomeCategory, Trending } from './providerStory';
