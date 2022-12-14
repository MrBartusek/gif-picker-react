import React, { useMemo } from 'react';
import Body from './components/body/Body';
import Header from './components/header/Header';
import PickerMain from './components/PickerMain';
import PickerContext from './context/PickerContext';
import SettingsContext from './context/SettingsContext';
import TenorContext from './context/TenorContext';
import './GifPickerReact.css';
import usePickerContext from './hooks/usePickerContext';
import useSettings from './hooks/useSettings';
import TenorManager from './managers/TenorManager';
import { ContentFilter, TenorImage } from './types/exposedTypes';

export interface GifPickerReactProps {
	tenorApiKey: string;
	onGifClick?: (gif: TenorImage) => void;
	autoFocusSearch?: boolean;
	contentFilter?: ContentFilter;
	clientKey?: string;
	country?: string;
	locale?: string;
	width?: number | string;
	height?: number | string;
	categoryHeight?: number | string;
}

function GifPickerReact(props: GifPickerReactProps): JSX.Element {
	const settings = useSettings(props);
	const pickerContext = usePickerContext();
	const tenorManager: TenorManager = useMemo(() => (
		new TenorManager(settings.tenorApiKey, settings.clientKey,
			settings.country, settings.locale, settings.contentFilter)
	), [ ]);

	return (
		<SettingsContext.Provider value={settings}>
			<PickerContext.Provider value={pickerContext}>
				<TenorContext.Provider value={tenorManager}>
					<PickerMain>
						<Header />
						<Body />
					</PickerMain>
				</TenorContext.Provider>
			</PickerContext.Provider>
		</SettingsContext.Provider>
	);
}

export default GifPickerReact;
