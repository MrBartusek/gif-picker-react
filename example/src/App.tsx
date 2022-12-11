import * as React from 'react';
import 'react-app-polyfill/ie11';
import GifPicker from '../../.';

const TENOR_API_KEY = 'AIzaSyA0y2NMijXxqwxnk6oWfJiC_usUc8Q4dUA';

function App(): JSX.Element{
	return (
		<div className="App">
			<h2>Gif Picker React Demo</h2>
			<div className="show-gif">
                Your selected Gif is:
			</div>

			<GifPicker
				tenorApiKey={TENOR_API_KEY}
			/>
		</div>
	);
}
export default App;
