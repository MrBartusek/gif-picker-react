import { Meta } from '@storybook/react-webpack5';
import React from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { GifPicker, Theme } from '..';
import { GifProvider } from '../types/GifProvider';

export interface CreateProviderStoriesOptions {
	title: string;
	apiKey?: string;
	makeProvider: (apiKey: string) => GifProvider;
}

export function createProviderStories(opts: CreateProviderStoriesOptions) {
	const meta = {
		title: opts.title,
		component: (props: any) => (
			<GifPicker
				{...props}
				provider={opts.makeProvider(props.apiKey)}
			/>
		),
		argTypes: {
			apiKey: {
				type: { name: 'string' },
			},
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
		},
	} as Meta<typeof GifPicker>;

	const Home = {
		args: {
			apiKey: opts.apiKey,
		},
	};

	const DarkTheme = {
		...Home,
		args: {
			...Home.args,
			theme: Theme.DARK,
		},
	};

	const HomeCategory = {
		...Home,
		play: async ({ canvasElement }: any) => {
			const canvas = within(canvasElement);

			await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
			await userEvent.click(canvas.getAllByTestId('gpr-category')[1]);
		},
	};

	const Trending = {
		...Home,
		play: async ({ canvasElement }: any) => {
			const canvas = within(canvasElement);

			await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
			await userEvent.click(canvas.getAllByTestId('gpr-category')[0]);
		},
	};

	return { meta, Home, DarkTheme, HomeCategory, Trending };
}
