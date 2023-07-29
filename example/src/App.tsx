import GifPicker, { TenorImage } from 'gif-picker-react';
import { useState } from 'react';
import './App.css';

const TENOR_API_KEY = 'AIzaSyBh5BTijm12gMpzUYpyfbKN8pjszpUR1FE';

function App(): JSX.Element {
	const [ selected, setSelected ] = useState<TenorImage>(null!);

	return (
		<div className="App">
			<h2>Gif Picker React Demo</h2>
			<div className="show-gif">
        Your selected GIF is:
				{selected && (
					<>
						<img
							src={selected.url}
							className="gif-preview"
							alt="Selected GIF"
						/>
						<a href={selected.shortTenorUrl} target="_blank" rel="noreferrer">
							{selected.shortTenorUrl}
						</a>
					</>
				)}
			</div>

			<GifPicker
        tenorApiKey={TENOR_API_KEY}
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