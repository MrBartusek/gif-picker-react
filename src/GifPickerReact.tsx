import React from 'react';
import Body from './components/body/Body';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import PickerMain from './components/PickerMain';
import PickerContext from './context/PickerContext';
import SettingsContext from './context/SettingsContext';
import ProviderContext from './context/ProviderContext';
import './GifPickerReact.css';
import usePickerContext from './hooks/usePickerContext';
import useSettings from './hooks/useSettings';
import { GifProvider } from './types/GifProvider';
import { Gif } from './types/types';

export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
	AUTO = 'auto',
}

export interface GifPickerReactProps {
	provider: GifProvider;
	onGifClick?: (gif: Gif) => void;
	autoFocusSearch?: boolean;
	width?: number | string;
	height?: number | string;
	categoryHeight?: number | string;
	theme?: Theme;
	initialSearchTerm?: string;
}

function GifPickerReact(props: GifPickerReactProps): React.JSX.Element {
	const settings = useSettings(props);
	const pickerContext = usePickerContext(settings.initialSearchTerm);

	return (
		<SettingsContext.Provider value={settings}>
			<PickerContext.Provider value={pickerContext}>
				<ProviderContext.Provider value={props.provider}>
					<PickerMain>
						<Header />
						<Body width={props.width} />
						<Footer />
					</PickerMain>
				</ProviderContext.Provider>
			</PickerContext.Provider>
		</SettingsContext.Provider>
	);
}

export default GifPickerReact;
