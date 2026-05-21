import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-webpack5-compiler-swc',
		'@storybook/addon-docs',
	],
	framework: {
		name: '@storybook/react-webpack5',
		options: {},
	},
	typescript: {
		check: false,
		reactDocgen: false,
	},
};

export default config;
