import React, { useMemo } from 'react';
import { GifPicker, type Gif } from 'gif-picker-react';
import { createGifSnapProvider } from './provider.js';

export function GifSnapExample({ onSelect }: { onSelect: (gif: Gif) => void }) {
	const provider = useMemo(() => createGifSnapProvider(), []);
	return (
		<section aria-label="Choose a GIF">
			<GifPicker
				provider={provider}
				initialSearchTerm="hello"
				onGifClick={onSelect}
			/>
			<a href="https://gifsnap.com/developers">Powered by GifSnap</a>
		</section>
	);
}
