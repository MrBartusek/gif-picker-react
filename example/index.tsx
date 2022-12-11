import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GifPicker from '../.';

const TENOR_API_KEY = 'AIzaSyA0y2NMijXxqwxnk6oWfJiC_usUc8Q4dUA';

const App = () => {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', marginTop: 50}}>
			<GifPicker tenorApiKey={TENOR_API_KEY} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
