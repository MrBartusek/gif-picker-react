# GifSnap custom provider example

This example adapts the public [GifSnap API](https://gifsnap.com/docs/javascript)
to `gif-picker-react` 2.0.0 using `@rowix/gifsnap-js`. It is optional example code;
GifSnap is not a built-in provider and its SDK is not a dependency of the picker.

## Use in your app

```sh
pnpm add gif-picker-react @rowix/gifsnap-js
```

Copy [`provider.ts`](provider.ts) and [`example.tsx`](example.tsx) into your app,
then render the example with your selection handler:

```tsx
import 'gif-picker-react/style.css';
import { GifSnapExample } from './example';

<GifSnapExample onSelect={(gif) => sendGif(gif.imageUrl)} />;
```

The example keeps the provider stable with `useMemo`. Import the stylesheet once
from your app's CSS entry point. In Next.js, place the interactive component
behind a `'use client'` boundary. `sendGif` above is your application's own message
handler; this example does not include a messaging backend.

For a different result count or a same-origin API proxy, pass options to the
factory in `example.tsx`:

```tsx
const provider = useMemo(
  () => createGifSnapProvider({ limit: 18, timeoutMs: 10000 }),
  [],
);
```

`baseUrl`, `fetch` and `timeoutMs` pass through to the JavaScript SDK. The default
base URL is `https://gifsnap.com/api/v1`; a proxy must return the same API response
shape. Do not put server credentials in frontend code.

## Behavior and limits

- Uses the animated `url` for both selection and the preview. `preview_url` can
  be a still poster. Full animated assets can be larger than thumbnails.
- Preserves the original API item in `gif.raw`, including source metadata, and
  keeps complete media URLs, including query parameters.
- Removes repeated IDs, exact media URLs and API-provided content aliases.
- Empty searches use trending. Categories return an empty array without making
  extra requests; search and the picker's Trending entry remain available.
- Returns one bounded page per query: 24 results by default, at most 50. The
  current provider interface has no pagination or cancellation hook, so this
  example does not add infinite scrolling or cancellation on unmount.
- HTTP errors reject instead of becoming empty results. SDK errors retain the
  status and `retryAfterSeconds`; display and retry behavior belong to the host.
- The current public API needs no key and is best-effort, without an SLA. There
  is no content-rating option in this example. API access does not change the
  rights attached to individual media.

## Verify the example

Use a current Node.js LTS release and pnpm. From this folder:

```sh
pnpm install --ignore-workspace --ignore-scripts --frozen-lockfile
pnpm test
```

The isolated fixture pins the published SDK and picker versions. Tests use a
mock `fetch`; they make no API requests and need no credentials. They cover
animated media mapping, deduplication, trending fallback, errors and result bounds.
The build also type-checks the React usage example against the published picker.
