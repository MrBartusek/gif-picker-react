import React, { useMemo } from 'react';
import { TenorResult } from '../../managers/TenorManager';
import { TenorImage } from '../../types/exposedTypes';
import ResultPlaceholder from '../placeholders/ResultPlaceholder';
import './GifList.css';
import ResultImage from './ResultImage';

export interface GifListProps {
	isLoading: boolean;
	result?: TenorResult;
	searchTerm?: string;
}

function GifList({ isLoading, result, searchTerm }: GifListProps): JSX.Element {
	const columns = useMemo(() => calculateColumns(result), [ result ]);
	if(isLoading) {
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
	else if(result && result.images.length > 0) {
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
	else {
		return (
			<div className='gpr-gif-list-no-result'>
				<span>No GIFs found!</span>
			</div>
		);
	}
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
