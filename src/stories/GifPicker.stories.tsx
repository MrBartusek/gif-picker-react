import { expect } from '@storybook/jest';
import { Meta, StoryFn } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
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
} as Meta<typeof GifPicker>;

export const Home = {};

export const DarkTheme = {
	args: {
		theme: Theme.DARK
	}
};

export const Search = {
	play: async ({ canvasElement }: any) => {
		console.log(canvasElement);
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByTestId('gpr-search-input'), 'patrick bateman');
	}
};

export const HomeCategory = {
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);

		await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
		await userEvent.click(canvas.getAllByTestId('gpr-category')[1]);
	}
};

export const Trending = {
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);

		await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
		await userEvent.click(canvas.getAllByTestId('gpr-category')[0]);
	}
};
