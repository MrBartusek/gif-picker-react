import React, { useContext, useEffect, useRef, useState } from 'react';
import PickerContext from '../../context/PickerContext';
import ProviderContext from '../../context/TenorContext';
import './Body.css';
import CategoryList from './CategoryList';
import SearchResult from './SearchResult';
import TrendingResult from './TrendingResult';
import { Gif, GifCategory } from '../../types/GifProvider';

const MAX_COLUMN_WIDTH = 170;

export interface BodyProps {
	/**
	 * Width prop is here is for sole purpose of updating the
	 * columns calculations when width prop change
	 */
	width?: number | string;
}

function Body({ width }: BodyProps): React.JSX.Element {
	const [categories, setCategories] = useState<GifCategory[] | undefined>(undefined);
	const [trending, setTrending] = useState<Gif | undefined>(undefined);
	const [pickerContext] = useContext(PickerContext);
	const [columnsCount, setColumnsCount] = useState(1);
	const provider = useContext(ProviderContext);
	const ref = useRef<HTMLDivElement>(null);

	/**
	 * Load categories and first trending image for home page
	 */
	useEffect(() => {
		(async (): Promise<any> => {
			const categoryList = await provider.getCategories();
			setCategories(categoryList);
			const trendingList = await provider.getTrending();
			setTrending(trendingList[0]);
		})();
	}, []);

	/**
	 * Calculate amount of columns to display
	 */
	useEffect(() => {
		const width = ref.current ? ref.current.offsetWidth : 0;
		let columns = Math.floor(width / MAX_COLUMN_WIDTH);
		if (columns < 1) columns = 1;
		setColumnsCount(columns);
	}, [ref.current, width]);

	return (
		<div
			className="gpr-body"
			ref={ref}
		>
			{((): React.JSX.Element => {
				if (pickerContext.showTrending) {
					return <TrendingResult columnsCount={columnsCount} />;
				} else if (pickerContext.searchTerm) {
					return (
						<SearchResult
							columnsCount={columnsCount}
							searchTerm={pickerContext.searchTerm}
						/>
					);
				} else {
					return (
						<CategoryList
							columnsCount={columnsCount}
							categories={categories}
							trending={trending}
						/>
					);
				}
			})()}
		</div>
	);
}

export default Body;
