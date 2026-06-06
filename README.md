# Gif Picker React | [Live Demo](https://dokurno.dev/gif-picker-react/)

[![npm](https://img.shields.io/npm/v/gif-picker-react)][npm]
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/MrBartusek/gif-picker-react/build.yml?branch=master)](https://github.com/MrBartusek/gif-picker-react/actions)
[![npm bundle size](https://img.shields.io/bundlephobia/min/gif-picker-react)](https://bundlephobia.com/package/gif-picker-react)
[![downloads](https://img.shields.io/npm/dw/gif-picker-react)][npm]

![demo](./demo.gif)

A GIF picker component for React applications that supports [Giphy](https://giphy.com/), [Klipy](https://klipy.com/) and custom providers. This picker fits styling of [emoji-picker-react](https://www.npmjs.com/package/emoji-picker-react) and can be used next to it.

## Installation

```bash
npm install gif-picker-react
```

> You can consider [pnpm](https://pnpm.io/) as a safer alternative to `npm`.

## Usage

```tsx
import { GifPicker } from 'gif-picker-react';
import { Klipy } from 'gif-picker-react/providers/klipy';

function App() {
  return (
    <div>
      <GifPicker provider={Klipy("YOUR_API_KEY")} />
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

The `provider` prop accepts any object that implements the `GifProvider` interface. You can pick one of the built-in providers or create your own:

- [Tenor](#tenor)
- [Klipy](#klipy)
- [Custom Providers](#custom-providers)

### Tenor

**[Tenor](https://tenor.com/)** is a GIF provider by Google.

> [!CAUTION]
> **Google is [shutting down the Tenor API](https://support.google.com/tenor/answer/10455265) on June 30, 2026.** Since `gif-picker-react` `v1.5.0` and below only support Tenor, those versions stop working entirely on that date. The `Tenor` provider remains available in `v2.0.0`, but it too only works until the deadline. To keep your GIF picker working, upgrade to `v2.0.0` and switch to another provider such as [Klipy](#klipy) or [Giphy](#giphy) before June 30, 2026.

```tsx
import { GifPicker } from 'gif-picker-react';
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
| contentFilter | `ContentFilter` | | Controls the Tenor [content filtering](https://developers.google.com/tenor/guides/content-filtering) options. If you are using Typescript you can use the `ContentFilter` enum. Possible values are `high`, `medium`, `low` and `off`. |

### Klipy

**[Klipy](https://klipy.com/)** is a GIF provider built by former Tenor employees. The API is free and ad-supported, with no paid plan.

> [!NOTE]
> Klipy ads are not supported by the picker. Ad objects returned by the Klipy API are filtered out, so make sure ads are disabled for your app key in the Klipy Partner Panel.

```tsx
import { GifPicker } from 'gif-picker-react';
import { Klipy } from 'gif-picker-react/providers/klipy';

<GifPicker provider={Klipy("YOUR_APP_KEY")} />
```

#### Obtaining a Klipy app key

In order to use the `GifPicker` element with the `Klipy` provider you are required to
provide a Klipy app key. To obtain this key please follow this simple guide:

1. Sign up at the [Klipy Partner Panel](https://partner.klipy.com)
1. Navigate to the *API Keys* page
1. Select *Add Platform* and create your platform to generate an app key
1. Copy the generated app key
1. Pass this key to the `Klipy` provider, e.g. `Klipy("YOUR_APP_KEY")`

#### Configuration

The `Klipy` function optionally accepts a configuration object with the following options:

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| baseUrl | `string` | `https://api.klipy.com/api/v1/` | Base URL used for Klipy API requests. |
| customerId | `string` | | A stable, unique identifier for the current user in your system (e.g. a hash or UUID). Used by Klipy for per-user personalization and anonymous share analytics. |
| locale | `string` | | Country code / language of the user as a two-letter [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1#Current_codes) code (e.g. `us`), optionally in `xx_YY` form (e.g. `en_US`). |
| contentFilter | `ContentFilter` | | Controls the Klipy content safety filter level. When unset, no filter is sent and the Klipy server default applies. If you are using Typescript you can use the `ContentFilter` enum. Possible values are `high`, `medium`, `low` and `off`. |
| quality | `KlipyQuality` | `KlipyQuality.MD` | Which size tier is passed to `onGifClick`. If you are using Typescript you can use the `KlipyQuality` enum. Possible values are `hd`, `md`, `sm` and `xs`. |
| previewQuality | `KlipyQuality` | `KlipyQuality.SM` | Which size tier is used for the preview gifs rendered in the picker grid. If you are using Typescript you can use the `KlipyQuality` enum. Possible values are `hd`, `md`, `sm` and `xs`. |

### Custom Providers

Besides the built-in providers, you can write or import a custom one. A provider just needs to implement the [`GifProvider` interface][gif-provider-interface]. The picker calls its methods to fetch GIFs. You can connect any GIF source: an unsupported third-party API, your
own backend, or a wrapper around an existing client. For real-world examples, see the built-in providers in the [`providers/` folder](https://github.com/MrBartusek/gif-picker-react/tree/master/src/providers).

Providers should implement the [`GifProvider` interface][gif-provider-interface]. When using TypeScript you can use `implements GifProvider`, but it is not required; any class or object that
satisfies this interface can be used as a provider. The return shapes (`Gif`, `GifPreview`, `GifCategory`) are the same provider-agnostic objects documented above.

#### Example

The recommended approach is a factory function that returns the provider object:

```tsx
import { GifProvider, Gif } from 'gif-picker-react';

export function Example(apiKey: string): GifProvider {
  return new ExampleProvider(apiKey);
}

class ExampleProvider implements GifProvider {
  constructor(private apiKey: string) {}

  async getTrending() {
    const data = await fetch(`https://api.example.com/trending?key=${this.apiKey}`)
      .then((res) => res.json());
    return data.items.map((item: any) => this.toGif(item));
  }

  async search(term: string) {
    const data = await fetch(`https://api.example.com/search?q=${term}&key=${this.apiKey}`)
      .then((res) => res.json());
    return data.items.map((item: any) => this.toGif(item));
  }

  async getCategories() {
    const data = await fetch(`https://api.example.com/categories?key=${this.apiKey}`)
      .then((res) => res.json());
    return data.items.map((category: any) => ({ name: category.name, imageUrl: category.image }));
  }

  private toGif(item: any) {
    return {
      id: item.id,
      imageUrl: item.url,
      width: item.width,
      height: item.height,
      description: item.title,
      preview: { imageUrl: item.thumb, width: item.thumbWidth, height: item.thumbHeight },
    };
  }
}
```

Then pass it to the picker:

```tsx
import { GifPicker } from 'gif-picker-react';

<GifPicker provider={Example('YOUR_API_KEY')} />
```

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

[npm]: https://www.npmjs.com/package/gif-picker-react
[gif-provider-interface]: https://github.com/MrBartusek/gif-picker-react/blob/master/src/types/GifProvider.ts
