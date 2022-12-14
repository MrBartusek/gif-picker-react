# Gif Picker React | [Live Demo](https://codesandbox.io/s/gif-picker-react-fxgi9t)

[![npm](https://img.shields.io/npm/v/gif-picker-react)](npm)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/MrBartusek/gif-picker-react/Build,%20Lint%20and%20Test)](https://github.com/MrBartusek/gif-picker-react/actions)
[![npm bundle size](https://img.shields.io/bundlephobia/min/gif-picker-react)](npm)
[![downloads](https://img.shields.io/npm/dm/gif-picker-react)](npm)

[npm]: https://www.npmjs.com/package/gif-picker-react

![demo](https://i.imgur.com/zVxBlkB.png)

An [Tenor](https://tenor.comt) GIF picker component for React applications that runs on [Tenor API V2](https://developers.google.com/tenor/guides/quickstart). This picker fits styling of [emoji-picker-react](https://www.npmjs.com/package/emoji-picker-react) and can be used next to it.

## Installation

```bash
npm install gif-picker-react
```

## Obtaining Tenor API v2 key

In order to use `GifPicker` element you are reqired to provide Tenor API key via
`tenorApiKey` prop. To obtain this key please follow this simple guide:

1. Login in to [Google Cloud Console](https://console.cloud.google.com)
1. Create a [new project](https://console.cloud.google.com/projectcreate)
1. In Google Cloud Marketplace navigate to [Tenor API](https://console.cloud.google.com/marketplace/product/google/tenor.googleapis.com)
1. Click on `Enable`
1. In navigation menu go to *APIs and services* tab and select [Credentials](https://console.cloud.google.com/apis/credentials)
1. Click `+ create credentials` and create *API key*, copy generated API key
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
| tenorApiKey | `string` | **Reqired** | Tenor v2 API key, obtained from [Google Cloud Console](https://console.cloud.google.com) |
| onGifClick | `function` | | Callback function that is called when an gif is clicked. The function receives the [`TenorImage`](#tenorimage) object as a parameter. |
| autoFocusSearch | `boolean` | `true` | Controls the auto focus of the search input. |
| contentFilter | `ContentFilter` | `ContentFilter.OFF` | Controls the Tenor [Content filtering](https://developers.google.com/tenor/guides/content-filtering) options. If you are using Typescript you can use `ContentFilter` enum. Possible values are `high`, `medium`, `low`, `off`  |
| clientKey | `string` | `gif-picker-react` | Name of your aplicattion. Used to diffircante multiple applications using same API key. |
| country | `string` | `US` | Specify the country of origin for the request. To do so, provide its two-letter [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) country code. |
| locale | `string (xx_YY)` | `en_US` | Specify the default language to interpret the search string. xx is the language's [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code, while the optional _YY value is the two-letter [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) country code.
| width | `number / string` | `350` | Controls the width of the picker. You can provide a number that will be treated as pixel size, or your any accepted css width as string.
| height | `number / string` | `450` | Controls the height of the picker. You can provide a number that will be treated as pixel size, or your any accepted css width as string.
| categoryHeight | `number / string` | `100` | Controls the height of the home page reaction category. You can provide a number that will be treated as pixel size, or your any accepted css width as string.

## TenorImage

This object is provided as an argument to callback specified in `onGifClick`:

| Property      | Type       | Description |
| ------------- | ---------- | ----------- |
| id            | `string`   | Tenor result identifier |
| tenorUrl      | `string`   | The full URL to view the post on [tenor.com](https://tenor.com/) |
| shortTenorUrl | `string`   | Short URL to view the post on [tenor.com](https://tenor.com/) |
| description   | `string`   | Textual description of the content. You can use this do populate image object `alt` attributte |
| createdAt     | `Date`     | Date object that represents when this post was created. |
| tags          | `string[]` | Array of tags for the post |
| url           | `string`   | Direct URL to the image source |
| height        | `number`   | Height of the image in pixels |
| width         | `number`   | Width of the image in pixels |

This is an example `TenorImage` object:

```js
{
  id: "16596569648018104856",
  tenorUrl: "https://tenor.com/view/american-psycho-patrick-bateman-american-psycho-gif-7212093",
  shortTenorUrl: "https://tenor.com/Eqmf.gif",
  description: "American Psycho Patrick Bateman GIF"
  createdAt: Date,
  tags: [ "American Psycho", "Patrick Bateman", "American", "psycho"],
  url: "https://media.tenor.com/5lLcKZgmIhgAAAAC/american-psycho-patrick-bateman.gif",
  height: 240,
  width: 244
}
```
