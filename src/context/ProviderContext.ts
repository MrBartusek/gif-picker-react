import * as React from 'react';
import { GifProvider } from '../types/GifProvider';

const ProviderContext = React.createContext<GifProvider>(null!);

export default ProviderContext;
