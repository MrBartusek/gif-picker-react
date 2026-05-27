import React from 'react';
import Body from './components/body/Body';
import Header from './components/header/Header';
import PickerMain from './components/PickerMain';
import PickerContext from './context/PickerContext';
import SettingsContext from './context/SettingsContext';
import ProviderContext from './context/TenorContext';
import './GifPickerReact.css';
import usePickerContext from './hooks/usePickerContext';
import useSettings from './hooks/useSettings';
import { Gif, GifProvider } from './types/GifProvider';

export enum Theme {
	LIGHT = 'light',
	DARK = 'dark',
	AUTO = 'auto',
}

export interface GifPickerReactProps {
	provider: GifProvider | (new () => GifProvider);
	onGifClick?: (gif: Gif) => void;
	autoFocusSearch?: boolean;
	width?: number | string;
	height?: number | string;
	categoryHeight?: number | string;
	theme?: Theme;
  initialSearchTerm?: string
}

function GifPickerReact(props: GifPickerReactProps): React.JSX.Element {
	const settings = useSettings(props);
	const pickerContext = usePickerContext(settings.initialSearchTerm);
  
	const provider = props.provider instanceof GifProvider ? props.provider : new props.provider();

	return (
		<SettingsContext.Provider value={settings}>
			<PickerContext.Provider value={pickerContext}>
				<ProviderContext.Provider value={provider}>
					<PickerMain>
						<Header />
						<Body width={props.width} />
					</PickerMain>
				</ProviderContext.Provider>
			</PickerContext.Provider>
		</SettingsContext.Provider>
	);
}

export default GifPickerReact;
