import React, { useContext, useEffect, useState } from 'react';
import TenorContext from '../../context/TenorContext';
import { TenorCategory } from '../../managers/TenorManager';
import CategoryList from './CategoryList';

function Body(): JSX.Element {
	const tenor = useContext(TenorContext);
	const [ categories, setCategories ] = useState<TenorCategory[] | undefined>(undefined);

	useEffect(() => {
		(async (): Promise<any> => {
			const cat = await tenor.categories();
			setCategories(cat);
		})();
	}, []);

	return (
		<CategoryList categories={categories} />
	);
}

export default Body;
