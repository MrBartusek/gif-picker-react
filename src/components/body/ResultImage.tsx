import React, { useContext } from 'react';
import SettingsContext from '../../context/SettingsContext';
import ProviderContext from '../../context/ProviderContext';
import './ResultImage.css';
import { Gif } from '../../types/types';

export interface ResultImageProps {
	gif: Gif;
	searchTerm?: string;
}

function ResultImage({ gif, searchTerm }: ResultImageProps): React.JSX.Element {
	const settings = useContext(SettingsContext);
	const provider = useContext(ProviderContext);

	async function onClick(): Promise<void> {
		try {
			const func = settings.onGifClick;

			if (func) {
				await func(gif);
			}

			await provider.registerShare(gif, { searchTerm });
		} catch (error) {
			console.error('[gif-picker-react] Failed to handle GIF selection', error);
		}
	}

	const image = gif.preview ?? gif;

	return (
		<button
			type="button"
			className="gpr-btn gpr-result-image"
			onClick={onClick}
			aria-label="Select GIF"
		>
			<img
				src={image.imageUrl}
				height={image.height}
				width={image.width}
				loading="lazy"
				alt={gif.description ?? ''}
			/>
		</button>
	);
}

export default ResultImage;
