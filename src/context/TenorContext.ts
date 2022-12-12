import * as React from 'react';
import TenorManager from '../managers/TenorManager';

const TenorContext = React.createContext<TenorManager>(null!);

export default TenorContext;
