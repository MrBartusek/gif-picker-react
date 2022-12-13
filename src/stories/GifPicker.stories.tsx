import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GifPicker from '..';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
Search.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await userEvent.type(canvas.getByTestId('gpr-search-input'), 'patrick bateman');
}

export const HomeCategory = Template.bind({});
HomeCategory.storyName = "Home Category"
HomeCategory.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  await waitFor(() => expect(canvas.getAllByTestId('gpr-category')[0]).toBeInTheDocument());
  await userEvent.click(canvas.getAllByTestId('gpr-category')[0]);
}
