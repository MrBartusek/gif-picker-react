/// <reference types="react" />
import { TenorImage } from '../../types/exposedTypes';
import './ResultImage.css';
export interface ResultImageProps {
    image: TenorImage;
}
declare function ResultImage({ image }: ResultImageProps): JSX.Element;
export default ResultImage;
