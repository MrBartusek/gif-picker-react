# Gif Picker React | [Live Demo](https://dokurno.dev/gif-picker-react/)

[![npm](https://img.shields.io/npm/v/gif-picker-react)][npm]
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/MrBartusek/gif-picker-react/build.yml?branch=master)](https://github.com/MrBartusek/gif-picker-react/actions)
[![npm bundle size](https://img.shields.io/bundlephobia/min/gif-picker-react)](https://bundlephobia.com/package/gif-picker-react)
[![downloads](https://img.shields.io/npm/dw/gif-picker-react)][npm]

[npm]: https://www.npmjs.com/package/gif-picker-react

![demo](./demo.gif)

A GIF picker component for React applications that supports [Tenor](https://tenor.com/), [Giphy](https://giphy.com/) and [Klipy](https://klipy.com/) and custom providers. This picker fits styling of [emoji-picker-react](https://www.npmjs.com/package/emoji-picker-react) and can be used next to it.

> [!WARNING]
> **Google is [shutting down the Tenor API](https://support.google.com/tenor/answer/10455265)**: new keys can't be generated since **January 13, 2026** and the API stops working on **June 30, 2026**. Multi-provider support (Giphy, Klipy and custom providers) ships in **v2.0.0** ([currently in development](https://github.com/MrBartusek/gif-picker-react/milestone/1)).

## Installation

```bash
npm install gif-picker-react
```

> You can consider [pnpm](https://pnpm.io/) as a safer alternative to `npm`.

## Usage

```tsx
import GifPicker from 'gif-picker-react';
import { Tenor } from 'gif-picker-react/providers/tenor';

function App() {
  return (
    <div>
      <GifPicker provider={Tenor("YOUR_API_KEY")} />
    </div>
  );
}
```

## Props

The following props are accepted by the picker:

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| provider | `GifProvider` | **Required** | The GIF provider used to fetch gifs, see [GIF Providers](#gif-providers) |
| onGifClick | `function` | | Callback function that is called when a gif is clicked. The function receives the [`Gif`](#gif) object as a parameter. |
| theme | `Theme` | `Theme.LIGHT` | Controls the theme of the picker. If you are using Typescript you can use `Theme` enum. Possible values are `light`, `dark` and `auto`.
| autoFocusSearch | `boolean` | `true` | Controls the auto focus of the search input. |
| width | `number / string` | `350` | Controls the width of the picker. You can provide a number that will be treated as pixel size, or any accepted css width as string.
| height | `number / string` | `450` | Controls the height of the picker. You can provide a number that will be treated as pixel size, or any accepted css width as string.
| categoryHeight | `number / string` | `100` | Controls the height of the home page reaction category. You can provide a number that will be treated as pixel size, or any accepted css width as string.
| initialSearchTerm | `string` | | Sets the initial search term when the picker is opened.

### Gif

This object is provided as an argument to callback specified in `onGifClick`. It is provider-agnostic, so the same shape is returned regardless of which provider you use.

| Property      | Type       | Description |
| ------------- | ---------- | ----------- |
| id            | `string`   | Provider result identifier |
| imageUrl      | `string`   | Direct URL to the gif source |
| height        | `number`   | Height of the gif in pixels |
| width         | `number`   | Width of the gif in pixels |
| description   | `string`   | Optional textual description of the content. You can use this to populate the image object `alt` attribute |
| preview       | `GifPreview` | Optional preview object with dimensions scaled down |

### GifPreview

This object is used for displaying the preview gifs in the picker. You can use it to render smaller and lower-resolution versions of the gifs.

| Property      | Type       | Description |
| ------------- | ---------- | ----------- |
| imageUrl      | `string`   | Direct URL to the preview image source |
| height        | `number`   | Height of the preview image in pixels |
| width         | `number`   | Width of the preview image in pixels |

This is an example `Gif` object:

```js
{
  id: "16596569648018104856",
  imageUrl: "https://media.tenor.com/5lLcKZgmIhgAAAAC/american-psycho-patrick-bateman.gif",
  height: 240,
  width: 244,
  description: "American Psycho Patrick Bateman GIF",
  preview: {
    imageUrl: "https://media.tenor.com/5lLcKZgmIhgAAAAM/american-psycho-patrick-bateman.gif",
    height: 120,
    width: 122
  }
}
```

## GIF Providers

The `provider` prop accepts any instance of the `GifProvider` abstract class. You can pick one of the built-in providers or create your own:

- [Tenor](#tenor)
- [Custom Providers](#custom-providers)

### Tenor

> [!WARNING]
> **Google is [shutting down the Tenor API](https://support.google.com/tenor/answer/10455265)**: new keys can't be generated since **January 13, 2026** and the API stops working on **June 30, 2026**. Multi-provider support (Giphy, Klipy and custom providers) ships in **v2.0.0** ([currently in development](https://github.com/MrBartusek/gif-picker-react/milestone/1)).

```tsx
import GifPicker from 'gif-picker-react';
import { Tenor } from 'gif-picker-react/providers/tenor';

<GifPicker provider={Tenor("YOUR_API_KEY")} />
```

#### Obtaining Tenor API v2 key

In order to use the `GifPicker` element with the `Tenor` provider you are required to
provide a Tenor API key. To obtain this key please follow this simple guide:

1. Log in to [Google Cloud Console](https://console.cloud.google.com)
1. Create a [new project](https://console.cloud.google.com/projectcreate)
1. In Google Cloud Marketplace navigate to [Tenor API](https://console.cloud.google.com/marketplace/product/google/tenor.googleapis.com)
1. Click on `Enable`
1. In navigation menu go to *APIs and services* tab and select [Credentials](https://console.cloud.google.com/apis/credentials)
1. Click `+ create credentials` and create *API key*, copy generated API key
1. Pass this key to the `Tenor` provider, e.g. `Tenor("YOUR_API_KEY")`

#### Configuration

The `Tenor` function optionally accepts a configuration object with the following options:

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| baseUrl | `string` | `https://tenor.googleapis.com/v2/` | Base URL used for Tenor API requests. |
| clientKey | `string` | `gif-picker-react` | Name of your application. Used to differentiate multiple applications using the same API key. |
| country | `string` | `US` | Specify the country of origin for the request, as a two-letter [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) country code. |
| locale | `string (xx_YY)` | `en_US` | Specify the default language to interpret the search string. xx is the language's [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) language code, while the optional _YY value is the two-letter [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) country code. |
| contentFilter | `ContentFilter` | `ContentFilter.OFF` | Controls the Tenor [content filtering](https://developers.google.com/tenor/guides/content-filtering) options. If you are using Typescript you can use the `ContentFilter` enum. Possible values are `high`, `medium`, `low` and `off`. |

### Custom Providers

> This section should be improved - [#50](https://github.com/MrBartusek/gif-picker-react/issues/50)

You can connect any GIF source by extending the `GifProvider` abstract class and passing an instance to the `provider` prop.

## Customization

### Custom Picker Width and Height

To customize the dimensions of the picker, use the height and width props. You can pass in a number that will be treated as pixel size, or any accepted css width/height as string.

```jsx
<GifPicker height={500} width={400} />
```

```jsx
<GifPicker height="100%" width="15em" />
```

### CSS Variables

The picker can be customized via CSS variables. The root selector for the picker is `.GifPickerReact`, when overriding, make sure to provide a more specific selector.

The list of possible variables is quite extensive, but the main ones you may want to override are:

- `--gpr-bg-color` - Background color of the picker.
- `--gpr-text-color` - Font color on the picker.
- `--gpr-highlight-color` - Color on hover or focus on the search bar, categories and gif.

You can find full list of all variables in [GifPickerReact.css](https://github.com/MrBartusek/gif-picker-react/blob/master/src/GifPickerReact.css).

## Contributing

Want to contribute to the project?

First of all, thanks! Check [`CONTRIBUTING.md`](CONTRIBUTING.md) for more details.
