import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import App from './App';
import './style.css'

ReactDOM.render((
	<React.StrictMode>
		<App />
	</React.StrictMode>
), document.getElementById('root'));
