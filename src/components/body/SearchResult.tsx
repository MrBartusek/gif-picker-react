import React, { useContext, useEffect, useMemo, useState } from 'react';
import TenorContext from '../../context/TenorContext';
import { TenorSearchResult } from '../../managers/TenorManager';
import { TenorImage } from '../../types/exposedTypes';
import ResultPlaceholder from '../placeholders/ResultPlaceholder';
import ResultImage from './ResultImage';
import './SearchResult.css';

export interface CategoryListProps {
	searchTerm: string;
}

function SearchResult({ searchTerm }: CategoryListProps): JSX.Element {
	const [ searchResult, setSearchResult ] = useState<TenorSearchResult | undefined>(undefined);
	const tenor = useContext(TenorContext);

	useEffect(() => {
		setSearchResult(undefined);
		async function search(): Promise<any> {
			const result = await tenor.search(searchTerm);
			setSearchResult(result);
		}
		const debounce = setTimeout(() => search(), 800);
		return (): void => clearTimeout(debounce);
	}, [ searchTerm ]);

	const columns = useMemo(() => calculateColumns(searchResult), [ searchResult ]);

	return (
		<div className='gpr-search-result'>
			{searchResult ? columns.map((col, i) => (
				<div className='gpr-search-result-column' key={i}>
					{col.map((img) => (
						<ResultImage key={img.id} image={img} searchTerm={searchTerm} />
					))}
				</div>
			)) : (
				<>
					<div className='gpr-search-result-column'>
						{[ 120, 70, 90, 175, 154 ].map((height, i) => (
							<ResultPlaceholder key={i} height={height} />
						))}
					</div>
					<div className='gpr-search-result-column'>
						{[ 150, 115, 135, 154, 145 ].map((height, i) => (
							<ResultPlaceholder key={i} height={height} />
						))}
					</div>
				</>
			)}
		</div>
	);
}

// TODO: Support multiple columns
function calculateColumns(result?: TenorSearchResult): TenorImage[][] {
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

export default SearchResult;
