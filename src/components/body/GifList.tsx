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
}

function GifList({ isLoading, result, searchTerm }: GifListProps): JSX.Element {
	const columns = useMemo(() => calculateColumns(result), [ result ]);
	const isEmpty = !result || result.images.length <= 0;

	if(isLoading) {
		return <GifListPlaceholder />;
	}

	if(isEmpty) {
		return (
			<div className='gpr-gif-list-no-result'>
				<span>No GIFs found!</span>
			</div>
		);
	}

	return (
		<div className='gpr-gif-list'>
			{columns.map((col, i) => (
				<div className='gpr-gif-list-column' key={i}>
					{col.map((img) => (
						<ResultImage key={img.id} image={img} searchTerm={searchTerm} />
					))}
				</div>
			))}
		</div>
	);
}

// TODO: Support multiple columns
function calculateColumns(result?: TenorResult): TenorImage[][] {
	if(!result) return [];
	const columns: TenorImage[][] = [ [], [] ];
	const columnHeight = [ 0,0 ];

	for(const img of result.images) {
		const aspectRatio = img.height / img.width;
		if(columnHeight[0] < columnHeight[1]) {
			columns[0].push(img);
			columnHeight[0] += aspectRatio;
		}
		else {
			columns[1].push(img);
			columnHeight[1] += aspectRatio;
		}
	}
	return columns;
}

export default GifList;
