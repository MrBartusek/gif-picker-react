import * as React from 'react';

import GifPickerReact, { GifPickerReactProps } from './GifPickerReact';
import ErrorBoundary from './components/ErrorBoundary';

export interface GifPickerProps extends GifPickerReactProps { }

function GifPicker(props: GifPickerProps): JSX.Element {
	return (
		<ErrorBoundary>
			<GifPickerReact {...props} />
		</ErrorBoundary>
	);
}

export default GifPicker;
