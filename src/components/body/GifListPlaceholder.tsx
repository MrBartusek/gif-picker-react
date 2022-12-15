import React from 'react';
import ResultPlaceholder from '../placeholders/ResultPlaceholder';

function GifListPlaceholder() {
	return (
		<div className='gpr-gif-list'>
			<div className='gpr-gif-list-column'>
				{[ 120, 70, 90, 175, 154 ].map((height, i) => (
					<ResultPlaceholder key={i} height={height} />
				))}
			</div>
			<div className='gpr-gif-list-column'>
				{[ 150, 115, 135, 154, 145 ].map((height, i) => (
					<ResultPlaceholder key={i} height={height} />
				))}
			</div>
		</div>
	);
}

export default GifListPlaceholder;
