import { GifPickerReactProps } from '../GifPickerReact';
import { ContentFilter, TenorImage, Theme } from '../types/exposedTypes';

/**
 * This is a parsed version of props with filled defaults
 */
export type GifPickerSettings = {
    tenorApiKey: string;
	onGifClick?: (gif: TenorImage) => void;
	autoFocusSearch: boolean;
	clientKey: string;
	country: string;
	locale: string;
	contentFilter: ContentFilter;
	height: string;
	width: string;
	categoryHeight: string;
	theme: Theme;
}

function useSettings(props: GifPickerReactProps): GifPickerSettings {
	if(!props.tenorApiKey) {
		throw new Error('tenorApiKey is a required prop that is missing');
	}
	return {
		tenorApiKey: props.tenorApiKey,
		onGifClick: props.onGifClick ?? undefined,
		autoFocusSearch: props.autoFocusSearch ?? true,
		clientKey: props.clientKey ?? 'gif-picker-react',
		country: props.country ?? 'US',
		locale: props.locale ?? 'en_US',
		contentFilter: props.contentFilter ?? ContentFilter.OFF,
		height: praseDimension(props.height ?? 450),
		width: praseDimension(props.width ?? 350),
		categoryHeight: praseDimension(props.categoryHeight ?? 100),
		theme: props.theme ?? Theme.LIGHT
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
