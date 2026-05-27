import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import GifPickerReact, { GifPickerReactProps } from './GifPickerReact';

export { ContentFilter } from './types/TenorTypes';
export { Theme } from './GifPickerReact';

export interface GifPickerProps extends GifPickerReactProps {}

function GifPicker(props: GifPickerProps): React.JSX.Element {
	return (
		<ErrorBoundary>
			<GifPickerReact {...props} />
		</ErrorBoundary>
	);
}

export default GifPicker;
