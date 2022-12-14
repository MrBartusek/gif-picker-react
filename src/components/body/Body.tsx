import React, { useContext, useEffect, useState } from 'react';
import PickerContext from '../../context/PickerContext';
import TenorContext from '../../context/TenorContext';
import { TenorCategory } from '../../managers/TenorManager';
import CategoryList from './CategoryList';
import SearchResult from './SearchResult';
import './Body.css';

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
		<div className='gpr-body'>
			{pickerContext.searchTerm ? (
				<SearchResult searchTerm={pickerContext.searchTerm} />
			) : (
				<CategoryList categories={categories} />
			)}

		</div>
	);
}

export default Body;
