import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import React from 'react';
import GifPicker, { Theme } from '..';

export default {
	title: 'Library/GifPicker',
	component: GifPicker,
	argTypes: {
		tenorApiKey: {
			type: { name: 'string' },
			defaultValue: process.env.STORYBOOK_TENOR_TOKEN
		},
		onGifClick: {
			action: 'GIF selected'
		},
		theme: {
			options: [ 'dark', 'light', 'auto' ],
			control: {
				type: 'radio'
			}
		},
		clientKey: {
			type: { name: 'string' }
		},
		locale: {
			type: { name: 'string' }
		},
		country: {
			type: { name: 'string' }
		},
		width: {
			type: { name: 'string' }
		},
		height: {
			type: { name: 'string' }
		},
		categoryHeight: {
			type: { name: 'string' }
		}
	}
} as ComponentMeta<typeof GifPicker>;

const Template: ComponentStory<typeof GifPicker> = (args) => <GifPicker {...args} />;

export const Home = Template.bind({});

export const DarkTheme = Template.bind({ theme: Theme.DARK });
DarkTheme.storyName = 'Dark Theme';

export const Search = Template.bind({});
Search.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	await userEvent.type(canvas.getByTestId('gpr-search-input'), 'patrick bateman');
};

export const HomeCategory = Template.bind({});
HomeCategory.storyName = 'Home Category';
HomeCategory.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
	await userEvent.click(canvas.getAllByTestId('gpr-category')[1]);
};

export const Trending = Template.bind({});
Trending.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
	await userEvent.click(canvas.getAllByTestId('gpr-category')[0]);
};

