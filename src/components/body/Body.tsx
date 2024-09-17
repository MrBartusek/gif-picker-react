import React, { useContext, useEffect, useRef, useState } from 'react';
import PickerContext from '../../context/PickerContext';
import TenorContext from '../../context/TenorContext';
import { TenorCategory } from '../../managers/TenorManager';
import { TenorImage } from '../../types/exposedTypes';
import './Body.css';
import CategoryList from './CategoryList';
import SearchResult from './SearchResult';
import TrendingResult from './TrendingResult';

const MAX_COLUMN_WIDTH = 170;

export interface BodyProps {
	/**
	 * Width prop is here is for sole purpose of updating the
	 * columns calculations when width prop change
	 */
	width?: number | string;
}

function Body({ width }: BodyProps): JSX.Element {
	const [ categories, setCategories ] = useState<TenorCategory[] | undefined>(undefined);
	const [ trending, setTrending ] = useState<TenorImage | undefined>(undefined);
	const [ pickerContext ] = useContext(PickerContext);
	const [ columnsCount, setColumnsCount ] = useState(1);
	const tenor = useContext(TenorContext);
	const ref = useRef<HTMLDivElement>(null);

	/**
	 * Load categories and first trending image for home page
	 */
	useEffect(() => {
		(async (): Promise<any> => {
			const categoryList = await tenor.categories();
			setCategories(categoryList);
			const trendingList = await tenor.trending(1);
			setTrending(trendingList.images[0]);
		})();
	}, []);

	/**
	 * Calculate amount of columns to display
	 */
	useEffect(() => {
		const width = ref.current ? ref.current.offsetWidth : 0;
		let columns = Math.floor( width / MAX_COLUMN_WIDTH );
		if(columns < 1) columns = 1;
		setColumnsCount(columns);
	}, [ ref.current, width ]);

	return (
		<div className='gpr-body' ref={ref}>
			{((): JSX.Element => {
				if (pickerContext.showTrending) {
					return <TrendingResult columnsCount={columnsCount} />;
				}
				else if (pickerContext.searchTerm || pickerContext.initialSearchTerm) {
					return <SearchResult columnsCount={columnsCount} searchTerm={pickerContext.searchTerm} />;
				}
				else {
					return <CategoryList columnsCount={columnsCount} categories={categories} trending={trending} />;
				}
			})()}
		</div>
	);
}

export default Body;
