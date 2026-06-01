import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { GifPicker, Theme } from '..';
import { GifProvider } from '../types/GifProvider';

const PROVIDER_ARG_TYPES = {
	onGifClick: {
		action: 'GIF selected',
	},
	theme: {
		options: ['dark', 'light', 'auto'],
		control: {
			type: 'radio',
		},
	},
	width: {
		type: { name: 'string' },
	},
	height: {
		type: { name: 'string' },
	},
	categoryHeight: {
		type: { name: 'string' },
	},
};

export function createProviderMeta(createProvider: () => GifProvider) {
	return {
		component: (props: any) => (
			<GifPicker
				{...props}
				provider={createProvider()}
			/>
		),
		argTypes: PROVIDER_ARG_TYPES,
	};
}

function clickCategory(index: number) {
	return async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);

		await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
		await userEvent.click(canvas.getAllByTestId('gpr-category')[index]);
	};
}

export const Home = {};
export const DarkTheme = { args: { theme: Theme.DARK } };
export const HomeCategory = { play: clickCategory(1) };
export const Trending = { play: clickCategory(0) };
