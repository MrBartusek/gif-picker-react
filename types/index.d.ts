/// <reference types="react" />
import { GifPickerReactProps } from './GifPickerReact';
export { ContentFilter, Theme, TenorImage } from './types/exposedTypes';
export interface GifPickerProps extends GifPickerReactProps {
}
declare function GifPicker(props: GifPickerProps): JSX.Element;
export default GifPicker;
