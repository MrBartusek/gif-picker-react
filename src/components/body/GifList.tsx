import React, { useMemo } from 'react';
import './GifList.css';
import GifListPlaceholder from './GifListPlaceholder';
import ResultImage from './ResultImage';
import { Gif } from '../../types/GifProvider';

export interface GifListProps {
	isLoading: boolean;
	result?: Gif[];
	searchTerm?: string;
	columnsCount: number;
}

function GifList({ isLoading, result, searchTerm, columnsCount }: GifListProps): React.JSX.Element {
	const columns = useMemo(() => generateColumns(result, columnsCount), [result, columnsCount]);
	const isEmpty = !result || result.length === 0;

	if (isLoading) {
		return <GifListPlaceholder columnsCount={columnsCount} />;
	}

	if (isEmpty) {
		return (
			<div className="gpr-gif-list-no-result">
				<span>No GIFs found!</span>
			</div>
		);
	}

	return (
		<div className="gpr-gif-list">
			{columns.map((column, i) => (
				<div
					className="gpr-gif-list-column"
					key={i}
				>
					{column.map((gif) => (
						<ResultImage
							key={gif.id}
							gif={gif}
							searchTerm={searchTerm}
						/>
					))}
				</div>
			))}
		</div>
	);
}

/**
 * Splits gifs into multiple columns of similar height
 */
function generateColumns(gifsList?: Gif[], columnsCount = 2) {
	if (!gifsList) {
		return [];
	}

	const columns: Gif[][] = new Array(columnsCount).fill(null).map(() => []);
	const columnsHeight = new Array(columnsCount).fill(0);

	for (const gif of gifsList) {
		const height = gif.preview ? gif.preview.height : gif.height;
		const width = gif.preview ? gif.preview.width : gif.width;
		const aspectRatio = height / width;

		// We want to put image of this loop in shortest column (smallest width)
		const shortestColumnIndex = columnsHeight.indexOf(Math.min(...columnsHeight));
		columns[shortestColumnIndex].push(gif);

		// Here we actually add aspect ratio rather than height since design is responsive
		columnsHeight[shortestColumnIndex] += aspectRatio;
	}

	return columns;
}

export default GifList;
