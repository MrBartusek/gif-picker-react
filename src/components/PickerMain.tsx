import React, { useContext } from 'react';
import SettingsContext from '../context/SettingsContext';
import { Theme } from '../types/exposedTypes';

export interface PickerMainProps {
    children: React.ReactNode;
}

function PickerMain({ children }: PickerMainProps): JSX.Element {
	const settings = useContext(SettingsContext);
	const style: React.CSSProperties = {
		height: settings.height,
		width: settings.width
	};
	const pickerClass = 'GifPickerReact gpr-main' + (settings.theme === Theme.DARK ? ' gpr-dark-theme' : '');
	return (
		<aside className={pickerClass} style={style}>
			{children}
		</aside>
	);
}

export default PickerMain;
