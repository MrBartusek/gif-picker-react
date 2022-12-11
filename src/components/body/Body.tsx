import React, { useContext, useEffect, useState } from 'react';
import PickerContext from '../../context/PickerContext';
import TenorContext from '../../context/TenorContext';
import { TenorCategory } from '../../managers/TenorManager';
import CategoryList from './CategoryList';
import SearchResult from './SearchResult';

function Body(): JSX.Element {
	const [ categories, setCategories ] = useState<TenorCategory[] | undefined>(undefined);
	const [ pickerContext ] = useContext(PickerContext);
	const tenor = useContext(TenorContext);

	useEffect(() => {
		(async (): Promise<any> => {
			const cat = await tenor.categories();
			setCategories(cat);
		})();
	}, []);

	return (
		<>
			{pickerContext.searchTerm ? (
				<SearchResult term={pickerContext.searchTerm} />
			) : (
				<CategoryList categories={categories} />
			)}

		</>
	);
}

export default Body;
