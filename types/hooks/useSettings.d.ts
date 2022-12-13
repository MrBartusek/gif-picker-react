import { GifPickerReactProps } from '../GifPickerReact';
import { ContentFilter, TenorImage } from '../types/exposedTypes';
/**
 * This is a parsed version of props with filled defaults
 */
export type GifPickerSettings = {
    tenorApiKey: string;
    onGifClick?: (gif: TenorImage) => void;
    clientKey: string;
    country: string;
    locale: string;
    contentFilter: ContentFilter;
    height: string;
    width: string;
    categoryHeight: string;
};
declare function useSettings(props: GifPickerReactProps): GifPickerSettings;
export default useSettings;
