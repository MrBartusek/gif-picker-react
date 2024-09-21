import React, { useEffect, useState } from 'react';
import { expect } from '@storybook/jest';
import { Meta } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import GifPicker, { Theme } from '..';

const useDebounce = (value: string, delay: number) => {
	const [ debouncedValue, setDebouncedValue ] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [ value, delay ]);

	return debouncedValue;
};

export default {
	title: 'Library/GifPicker',
	component: (props: any) => {
		const debouncedSearchTerm = useDebounce(props.initialSearchTerm, 500);

		return <GifPicker key={debouncedSearchTerm} {...props} />;
	},
	argTypes: {
		tenorApiKey: {
			type: { name: 'string' }
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
		},
		initialSearchTerm: {
			type: { name: 'string' }
		}
	}
} as Meta<typeof GifPicker>;

export const Home = {
	args: {
		tenorApiKey: process.env.STORYBOOK_TENOR_TOKEN
	}
};

export const DarkTheme = {
	...Home,
	args: {
		...Home.args,
		theme: Theme.DARK
	}
};

export const Search = {
	...Home,
	args: {
		...Home.args,
		initialSearchTerm: 'patrick bateman'
	}
};

export const HomeCategory = {
	...Home,
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);

		await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
		await userEvent.click(canvas.getAllByTestId('gpr-category')[1]);
	}
};

export const Trending = {
	...Home,
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);

		await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
		await userEvent.click(canvas.getAllByTestId('gpr-category')[0]);
	}
};
