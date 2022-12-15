import React from 'react';
import ResultPlaceholder from '../placeholders/ResultPlaceholder';

const SHOW_DELAY = 90;

function GifListPlaceholder() {
	return (
		<div className='gpr-gif-list'>
			<div className='gpr-gif-list-column'>
				{[ 120, 100, 130, 175, 154 ].map((height, i) => (
					<ResultPlaceholder key={i} height={height} showDelay={((i + 1) * SHOW_DELAY * 2) - SHOW_DELAY} />
				))}
			</div>
			<div className='gpr-gif-list-column'>
				{[ 150, 115, 135, 154, 145 ].map((height, i) => (
					<ResultPlaceholder key={i} height={height} showDelay={((i + 1) * SHOW_DELAY * 2)} />
				))}
			</div>
		</div>
	);
}

export default GifListPlaceholder;
