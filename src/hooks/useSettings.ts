import { GifPickerReactProps, Theme } from '../GifPickerReact';
import { Gif, GifProvider } from '../types/GifProvider';

/**
 * This is a parsed version of props with filled defaults
 */
export type GifPickerSettings = {
	provider: GifProvider;
	onGifClick?: (gif: Gif) => Promise<void> | void;
	autoFocusSearch: boolean;
	width: string;
	height: string;
	categoryHeight: string;
	theme: Theme;
	initialSearchTerm: string;
};

function useSettings(props: GifPickerReactProps): GifPickerSettings {
	if (!props.provider) {
		throw new Error('provider is a required prop that is missing');
	}
	return {
		provider: props.provider,
		onGifClick: props.onGifClick ?? undefined,
		autoFocusSearch: props.autoFocusSearch ?? true,
		height: praseDimension(props.height ?? 450),
		width: praseDimension(props.width ?? 350),
		categoryHeight: praseDimension(props.categoryHeight ?? 100),
		theme: getTheme(props.theme),
		initialSearchTerm: props.initialSearchTerm ?? '',
	};
}

function praseDimension(dimension: string | number): string {
	if (typeof dimension == 'number') {
		return `${dimension}px`;
	} else if (typeof dimension == 'string') {
		return dimension;
	} else {
		throw new TypeError('Invalid dimension provided');
	}
}

function getTheme(theme?: Theme): Theme {
	if (theme === Theme.AUTO) {
		return isSystemDarkTheme() ? Theme.DARK : Theme.LIGHT;
	} else {
		return theme ?? Theme.LIGHT;
	}
}

function isSystemDarkTheme(): boolean {
	if (typeof window === 'undefined') {
		return false;
	}

	return !!window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default useSettings;
