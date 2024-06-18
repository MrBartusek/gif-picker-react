import React, { useContext } from 'react';
import SettingsContext from '../../context/SettingsContext';
import TenorContext from '../../context/TenorContext';
import { TenorImage } from '../../types/exposedTypes';
import './ResultImage.css';

export interface ResultImageProps {
	image: TenorImage;
	searchTerm?: string
}

function ResultImage({ image, searchTerm }: ResultImageProps): JSX.Element {
	const settings = useContext(SettingsContext);
	const tenor = useContext(TenorContext);

	function onClick(): void {
		const func = settings.onGifClick;
		if(func) func(image);
		tenor.registerShare(image, searchTerm);
	}

	return (
		<button
			type="button"
			className='gpr-btn gpr-result-image'
			onClick={onClick}
		>
			<img src={image.preview.url} height={image.preview.height} width={image.preview.width} loading="lazy" />
		</button>
	);
}

export default ResultImage;
