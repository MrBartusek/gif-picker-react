import React, { useContext } from 'react';
import SettingsContext from '../context/SettingsContext';

export interface PickerMainProps {
    children: React.ReactNode;
}

function PickerMain({ children }: PickerMainProps): JSX.Element {
	const settings = useContext(SettingsContext);

	const style: React.CSSProperties = {
		height: settings.height,
		width: settings.width
	};

	return (
		<aside className='GifPickerReact gpr-main' style={style}>
			{children}
		</aside>
	);
}

export default PickerMain;
