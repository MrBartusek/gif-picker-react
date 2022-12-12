# Gif Picker React | [Live Demo](https://codesandbox.io/s/gif-picker-react-fxgi9t)

[hero]

An [Tenor](https://tenor.comt) gif picker component for React applications that runs on [Tenor API V2](https://developers.google.com/tenor/guides/quickstart). This picker fits styling of [emoji-picker-react]([emoji-picker-react](https://www.npmjs.com/package/emoji-picker-react)) and can be used next to it.

## Installation

```bash
npm install gif-picker-react
```

## Obtaining Tenor API key

In order to use `GifPicker` element you are reqired to provide Tenor API key via
`tenorApiKey` prop. To obtain this key please follow this simple guide:

1. Login in to [Google Cloud Console](https://console.cloud.google.com)
1. Create a [new project](https://console.cloud.google.com/projectcreate)
1. In Google Cloud Marketplace navigate to [Tenor API](https://console.cloud.google.com/marketplace/product/google/tenor.googleapis.com)
1. Click on `Enable`
1. In navigation menu go to *APIs and services* tab and select [Credentials](https://console.cloud.google.com/apis/credentials)
1. Click `+ create credentials` and ceate *API key*, copy generated API key
1. Pass this key as prop to `tenorApiKey`

## Usage

```js
import GifPicker from 'gif-picker-react';

function App() {
  return (
    <div>
      <GifPicker tenorApiKey={"YOUR_API_KEY"} />
    </div>
  );
}
```

## Props

The following props are accepted by the picker:

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| tenorApiKey | string | **Reqired** | Tenor v2 API key |