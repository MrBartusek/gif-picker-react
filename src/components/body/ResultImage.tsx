import React, { useContext } from 'react';
import SettingsContext from '../../context/SettingsContext';
import { TenorImage } from '../../types/exposedTypes';
import './ResultImage.css';

export interface ResultImageProps {
	image: TenorImage;
}

function ResultImage({ image }: ResultImageProps): JSX.Element {
	const settings = useContext(SettingsContext);

	function onClick(): void {
		const func = settings.onGifClick;
		if(func) func(image);
	}

	return (
		<button
			className='gpr-btn gpr-result-image'
			onClick={onClick}
		>
			<img src={image.url} height={image.height} width={image.width}/>
		</button>
	);
}

export default ResultImage;
