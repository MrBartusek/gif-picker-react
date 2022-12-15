import { expect } from '@storybook/jest';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import React from 'react';
import GifPicker from '..';
import crypto from 'crypto';

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

export const NoResults = Template.bind({});
NoResults.storyName = 'No Results';
NoResults.play = async ({ canvasElement }) => {
	const canvas = within(canvasElement);

	const name = '09d0ff68830f8392295d094ddff011b85e3a3c44b6cfa63bbab6c0ece91cc9144de983cde1bd61d730733b79c47e986840792dd21d4363622d9e1e589f108047771bf99ac329e7cc4f7cc7b809e78648287e66714db55e1000586acc8a435f004ab1426e8ab34a6d7197bed60ed237f2f127441741158e933fa10ebfa99cac07dafb499d67eee48f6e9d8cef3cd83b54eed6e418822cddd4260417773122579022b18501482c7a6216f5cbaba0811aa5f3ccee28ab090f910210b88fd1050ace326d1d86d5f173e2ad80a444de9202dfcf35ce1686222217fbda31fc1a7a54c1d3a51cc35b7f2102b812cf459454cd11f0413cb7a33a0062aa2a39f9e8babbf36b3bdcf562c4282e0f70ee91675ca63dec11c7e9e01064ae3274997068931e88b2b8f23d7f45800b055ca1b5';
	await userEvent.paste(canvas.getByTestId('gpr-search-input'), name);
};

