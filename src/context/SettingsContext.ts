import * as React from 'react';
import { GifPickerReactProps } from '../GifPickerReact';

const SettingsContext = React.createContext<GifPickerReactProps>(null!);

export default SettingsContext;
