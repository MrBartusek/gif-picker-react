import { GifPickerReactProps } from '../GifPickerReact';
import { ContentFilter } from '../types/exposedTypes';

/**
 * This is a parsed version of props with filled defaults
 */
export type GifPickerSettings = {
    tenorApiKey: string;
	contentFilter: ContentFilter;
	locale: string;
	height: string;
	width: string;
}

function useSettings(props: GifPickerReactProps): GifPickerSettings {
	if(!props.tenorApiKey) {
		throw new Error('tenorApiKey is a required prop that is missing');
	}

	return {
		tenorApiKey: props.tenorApiKey,
		contentFilter: props.contentFilter ?? ContentFilter.OFF,
		locale: props.locale ?? 'en_US',
		height: praseDimension(props.height ?? 450),
		width: praseDimension(props.width ?? 350)
	};
}

/**
 * Processed raw dimension as number or string to css property. You can provide
 * a number that will be treated as pixel size, or your any accepted css height as string.
 * @param dimension raw dimension
 * @returns css size string
 */
function praseDimension(dimension: string | number): string {
	if(typeof dimension == 'number') {
		return `${dimension}px`;
	}
	else if(typeof dimension == 'string') {
		return dimension;
	}
	else {
		throw new TypeError('Invalid dimension provided');
	}
}

export default useSettings;
