import * as React from 'react';
import { GifPickerSettings } from '../hooks/useSettings';

const SettingsContext = React.createContext<GifPickerSettings>(null!);

export default SettingsContext;
