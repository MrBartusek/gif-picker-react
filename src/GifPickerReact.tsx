import React from 'react';
import Body from './components/body/Body';
import Header from './components/header/Header';
import PickerMain from './components/PickerMain';
import PickerContext from './context/PickerContext';
import SettingsContext from './context/SettingsContext';
import './GifPickerReact.css';
import usePickerContext from './hooks/usePickerContext';
import useSettings from './hooks/useSettings';
import { ContentFilter } from './types/exposedTypes';

export interface GifPickerReactProps {
	tenorApiKey: string;
	onGifClick?: () => void;
	contentFilter?: ContentFilter;
	locale?: string;
	width?: number | string;
	height?: number | string;
}

function GifPickerReact(props: GifPickerReactProps): JSX.Element {
	const settings = useSettings(props);
	const pickerContext = usePickerContext();

	return (
		<SettingsContext.Provider value={settings}>
			<PickerContext.Provider value={pickerContext}>
				<PickerMain>
					<Header />
					<Body />
				</PickerMain>
			</PickerContext.Provider>
		</SettingsContext.Provider>
	);
}

export default GifPickerReact;
