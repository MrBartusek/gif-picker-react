/// <reference types="react" />
import './GifPickerReact.css';
import { ContentFilter, TenorImage } from './types/exposedTypes';
export interface GifPickerReactProps {
    tenorApiKey: string;
    onGifClick?: (gif: TenorImage) => void;
    contentFilter?: ContentFilter;
    clientKey?: string;
    country?: string;
    locale?: string;
    width?: number | string;
    height?: number | string;
    categoryHeight?: number | string;
}
declare function GifPickerReact(props: GifPickerReactProps): JSX.Element;
export default GifPickerReact;
