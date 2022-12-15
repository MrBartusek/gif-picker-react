import React, { useContext, useEffect, useState } from 'react';
import PickerContext from '../../context/PickerContext';
import TenorContext from '../../context/TenorContext';
import { TenorCategory } from '../../managers/TenorManager';
import { TenorImage } from '../../types/exposedTypes';
import './Body.css';
import CategoryList from './CategoryList';
import SearchResult from './SearchResult';
import TrendingResult from './TrendingResult';

function Body(): JSX.Element {
	const [ categories, setCategories ] = useState<TenorCategory[] | undefined>(undefined);
	const [ trending, setTrending ] = useState<TenorImage | undefined>(undefined);
	const [ pickerContext ] = useContext(PickerContext);
	const tenor = useContext(TenorContext);

	useEffect(() => {
		(async (): Promise<any> => {
			const categoryList = await tenor.categories();
			setCategories(categoryList);
			const trendingList = await tenor.trending(1);
			setTrending(trendingList.images[0]);
		})();
	}, []);

	return (
		<div className='gpr-body'>
			{((): JSX.Element => {
				if(pickerContext.showTrending) {
					return <TrendingResult />;
				}
				else if(pickerContext.searchTerm) {
					return <SearchResult searchTerm={pickerContext.searchTerm} />;
				}
				else {
					return <CategoryList categories={categories} trending={trending} />;
				}
			})()}
		</div>
	);
}

export default Body;
