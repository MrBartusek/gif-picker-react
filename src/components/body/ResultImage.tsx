import React, { useContext } from 'react';
import SettingsContext from '../../context/SettingsContext';
import ProviderContext from '../../context/TenorContext';
import './ResultImage.css';
import { Gif } from '../../types/GifProvider';

export interface ResultImageProps {
	gif: Gif;
	searchTerm?: string;
}

function ResultImage({ gif, searchTerm }: ResultImageProps): React.JSX.Element {
	const settings = useContext(SettingsContext);
	const provider = useContext(ProviderContext);

	async function onClick(): Promise<void> {
		const func = settings.onGifClick;
		if (func) {
			await func(gif);
		}
		await provider.registerShare(gif, { searchTerm });
	}

	return (
		<button
			type="button"
			className="gpr-btn gpr-result-image"
			onClick={onClick}
		>
			<img
				src={gif.preview?.imageUrl || gif.imageUrl}
				height={gif.preview?.height || gif.height}
				width={gif.preview?.width || gif.width}
				loading="lazy"
			/>
		</button>
	);
}

export default ResultImage;
