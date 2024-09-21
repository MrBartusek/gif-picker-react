import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import GifPickerReact, { GifPickerReactProps } from './GifPickerReact';

export { ContentFilter, TenorImage, Theme } from './types/exposedTypes';

export interface GifPickerProps extends GifPickerReactProps {}

function GifPicker(props: GifPickerProps): JSX.Element {
	return (
		<ErrorBoundary>
			<GifPickerReact {...props} />
		</ErrorBoundary>
	);
}

export default GifPicker;
