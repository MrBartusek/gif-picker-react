import { GifPicker, Gif } from 'gif-picker-react';
import { Klipy } from 'gif-picker-react/providers/klipy';
import { useState } from 'react';
import './App.css';

const KLIPY_APP_KEY = 'bAq6J4tOAyDBvzAwuo3fUcDYIxkAvEYxMVXNEyaxggkau1iqsYXy3lGWvJeSSSQR';

function App(): JSX.Element {
	const [ selected, setSelected ] = useState<Gif>(null!);

	return (
		<div className="App">
			<h2>Gif Picker React Demo</h2>
			<div className="show-gif">
        Your selected GIF is:
				{selected && (
					<>
						<img
							src={selected.imageUrl}
							className="gif-preview"
							alt={selected.description ?? 'Selected GIF'}
						/>
						<a href={selected.imageUrl} target="_blank" rel="noreferrer">
							{selected.imageUrl}
						</a>
					</>
				)}
			</div>

			<GifPicker
        provider={Klipy(KLIPY_APP_KEY)}
        onGifClick={setSelected}
      />

			<div className='footer'>
				<code>gif-picker-react</code> | {' '}
				<a href="https://github.com/MrBartusek/gif-picker-react" target="_blank" rel="noreferrer">github</a> - {' '}
				<a href="https://www.npmjs.com/package/gif-picker-react" target="_blank" rel="noreferrer">npm</a>
			</div>
		</div>
	);
}
export default App;
