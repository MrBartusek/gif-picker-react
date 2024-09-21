import React from 'react';
import ResultPlaceholder from '../placeholders/ResultPlaceholder';

const PLACEHOLDER_HEIGHTS = [
	[120, 100, 130, 175, 154, 110],
	[150, 115, 135, 154, 145, 170],
	[140, 125, 120, 150, 100, 125],
	[130, 145, 175, 120, 135, 100],
];

export interface GifListPlaceholderProps {
	columnsCount: number;
	showDelay?: number;
}

function GifListPlaceholder({ columnsCount, showDelay = 70 }: GifListPlaceholderProps) {
	return (
		<div className="gpr-gif-list">
			{[...Array(columnsCount)].map((_, i) => (
				<div
					className="gpr-gif-list-column"
					key={i}
				>
					{PLACEHOLDER_HEIGHTS[i % PLACEHOLDER_HEIGHTS.length].map((height, j) => (
						<ResultPlaceholder
							key={j}
							height={height}
							showDelay={(j + 1) * showDelay * columnsCount + showDelay * i}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default GifListPlaceholder;
