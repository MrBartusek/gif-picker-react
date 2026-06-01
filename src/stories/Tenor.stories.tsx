import { createProviderStories } from './createProviderStories';
import { Tenor } from '../providers/tenor';

const stories = createProviderStories({
	title: 'Providers/Tenor',
	apiKey: process.env.STORYBOOK_TENOR_TOKEN,
	makeProvider: (apiKey) => Tenor(apiKey),
});

export default stories.meta;
export const { Home, DarkTheme, HomeCategory, Trending } = stories;
