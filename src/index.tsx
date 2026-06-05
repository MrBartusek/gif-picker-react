import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import GifPickerReact, { GifPickerReactProps } from './GifPickerReact';

export { Theme } from './GifPickerReact';
export type {
	GifProvider,
	GifProviderAttribution,
	RegisterShareContext,
} from './types/GifProvider';
export type { Gif, GifCategory, GifPreview } from './types/types';

export interface GifPickerProps extends GifPickerReactProps {}

export function GifPicker(props: GifPickerProps): React.JSX.Element {
	return (
		<ErrorBoundary>
			<GifPickerReact {...props} />
		</ErrorBoundary>
	);
}
