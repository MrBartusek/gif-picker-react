import React from 'react';
import { expect } from '@storybook/jest';
import { Meta } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import GifPicker, { Theme } from '..';

export default {
	title: 'Library/GifPicker',
	component: GifPicker,
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
	play: async ({ canvasElement }: any) => {
		const canvas = within(canvasElement);

		await userEvent.type(canvas.getByTestId('gpr-search-input'), 'patrick bateman');
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

export const ControlledSearchTerm = {
	...Home,
	render: (props: any) => {
		const [ searchTerm, setSearchTerm ] = React.useState('love');

		return (
			<>
				<div>Search term: {searchTerm}</div>
				<button onClick={() => setSearchTerm('celebration')}>
					change to &quot;celebration&quot;
				</button>
				<GifPicker {...props} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			</>
		);
	}
};
