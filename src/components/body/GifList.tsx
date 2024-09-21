import React, { useMemo } from 'react';
import { TenorResult } from '../../managers/TenorManager';
import { TenorImage } from '../../types/exposedTypes';
import './GifList.css';
import GifListPlaceholder from './GifListPlaceholder';
import ResultImage from './ResultImage';

export interface GifListProps {
	isLoading: boolean;
	result?: TenorResult;
	searchTerm?: string;
	columnsCount: number;
}

function GifList({ isLoading, result, searchTerm, columnsCount }: GifListProps): JSX.Element {
	const columns = useMemo(() => generateColumns(result, columnsCount), [result, columnsCount]);
	const isEmpty = !result || result.images.length <= 0;

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
			{columns.map((col, i) => (
				<div
					className="gpr-gif-list-column"
					key={i}
				>
					{col.map((img) => (
						<ResultImage
							key={img.id}
							image={img}
							searchTerm={searchTerm}
						/>
					))}
				</div>
			))}
		</div>
	);
}

/**
 * Splits TenorResult into grid of TenorImage with set amount of columns
 * Columns should have more or less similar height but don't necessarily need to
 * have fixed amount of elements, GIFs don't have uniform heights
 *
 * @returns array of columns (which are the arrays of TenorImage)
 */
function generateColumns(result?: TenorResult, columnsCount = 2): TenorImage[][] {
	if (!result) return [];
	const columns: TenorImage[][] = new Array(columnsCount).fill(null).map(() => []);
	const columnsHeight = new Array(columnsCount).fill(0);

	for (const img of result.images) {
		const aspectRatio = img.preview.height / img.preview.width;
		// We want to put image of this loop in shortest column (smallest width)
		const shortestColumnIndex = columnsHeight.indexOf(Math.min(...columnsHeight));
		columns[shortestColumnIndex].push(img);
		// Here we actually add aspect ratio rather than height since design is responsive
		columnsHeight[shortestColumnIndex] += aspectRatio;
	}
	return columns;
}

export default GifList;
