import assert from 'node:assert/strict';
import test from 'node:test';
import { createGifSnapProvider } from '../dist/provider.js';

const item = (overrides = {}) => ({
	id: 'fixture-1',
	title: 'Hello',
	url: 'https://media.example/hello.gif?token=a',
	preview_url: 'https://media.example/poster.jpg',
	width: 320,
	height: 180,
	type: 'gif',
	source: 'fixture',
	...overrides,
});
function page(data) {
	return {
		data,
		pagination: {
			page: 1,
			limit: 24,
			total: data.length,
			has_next: false,
			next_page: null,
			offset: 0,
		},
	};
}
function stub(data) {
	const requests = [];
	const fetch = async (url, options) => {
		requests.push({ url: new URL(url), options });
		return new Response(JSON.stringify(page(data)), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	};
	return { requests, fetch };
}

test('maps an animated asset, preserves query parameters and original metadata', async () => {
	const original = item({ attribution_url: 'https://example.org/creator' });
	const fake = stub([original]);
	const provider = createGifSnapProvider({ fetch: fake.fetch, limit: 18 });
	const [gif] = await provider.search(' cats & dogs ');
	assert.equal(fake.requests[0].url.pathname, '/api/v1/gifs/search');
	assert.equal(fake.requests[0].url.searchParams.get('q'), 'cats & dogs');
	assert.equal(fake.requests[0].url.searchParams.get('limit'), '18');
	assert.equal(fake.requests[0].options.credentials, 'omit');
	assert.equal(gif.imageUrl, original.url);
	assert.equal(gif.preview.imageUrl, original.url);
	assert.deepEqual(gif.raw, original);
	assert.equal(gif.provider, 'gifsnap');
});

test('removes repeated IDs, exact URLs and verified content aliases', async () => {
	const fake = stub([
		item({ content_id: 'alias-a' }),
		item({ url: 'https://media.example/variant.gif', content_id: 'alias-b' }),
		item({ id: 'another', url: 'https://media.example/alias.gif', content_id: 'alias-b' }),
		item({ id: 'same-url' }),
		item({ id: 'different', url: 'https://media.example/different.webp?key=b' }),
	]);
	const result = await createGifSnapProvider({ fetch: fake.fetch }).getTrending();
	assert.deepEqual(
		result.map((gif) => gif.id),
		['fixture-1', 'different'],
	);
	assert.equal(result[1].preview.imageUrl, 'https://media.example/different.webp?key=b');
});

test('empty search uses trending, and categories do not trigger extra requests', async () => {
	const fake = stub([item()]);
	const provider = createGifSnapProvider({ fetch: fake.fetch });
	assert.deepEqual(await provider.getCategories(), []);
	assert.equal(fake.requests.length, 0);
	await provider.search('  ');
	assert.equal(fake.requests.length, 1);
	assert.equal(fake.requests[0].url.pathname, '/api/v1/gifs/trending');
	assert.equal(fake.requests[0].url.searchParams.get('page'), '1');
});

test('retains HTTP error and Retry-After information instead of returning an empty success', async () => {
	const provider = createGifSnapProvider({
		fetch: async () =>
			new Response('{}', {
				status: 429,
				headers: { 'Retry-After': '45' },
			}),
	});
	await assert.rejects(
		provider.search('hello'),
		(error) => error.code === 'http' && error.status === 429 && error.retryAfterSeconds === 45,
	);
});

test('bounds request size and provides safe layout dimensions for missing dimensions', async () => {
	for (const limit of [0, 51, 2.5, NaN]) {
		assert.throws(() => createGifSnapProvider({ limit }), RangeError);
	}
	const fake = stub([item({ width: 0, height: 0 })]);
	const [gif] = await createGifSnapProvider({ fetch: fake.fetch }).getTrending();
	assert.equal(gif.width, 240);
	assert.equal(gif.height, 180);
});
