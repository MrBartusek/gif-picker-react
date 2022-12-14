import GifPickerReact, { GifPickerReactProps } from './GifPickerReact';
import ErrorBoundary from './components/ErrorBoundary';

export {
	ContentFilter,
	Theme,
	TenorImage
} from './types/exposedTypes';

export interface GifPickerProps extends GifPickerReactProps { }

function GifPicker(props: GifPickerProps): JSX.Element {
	return (
		<ErrorBoundary>
			<GifPickerReact {...props} />
		</ErrorBoundary>
	);
}

export default GifPicker;
