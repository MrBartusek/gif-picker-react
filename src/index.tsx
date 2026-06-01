import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import GifPickerReact, { GifPickerReactProps } from './GifPickerReact';

export { ContentFilter } from './types/TenorTypes';
export { Theme } from './GifPickerReact';
export { Tenor } from './providers/Tenor';

export interface GifPickerProps extends GifPickerReactProps {}

export function GifPicker(props: GifPickerProps): React.JSX.Element {
	return (
		<ErrorBoundary>
			<GifPickerReact {...props} />
		</ErrorBoundary>
	);
}
