import React from 'react';
import { TenorCategory } from '../../managers/TenorManager';
import Category from './Category';
import './CategoryList.css';

export interface CategoryListProps {
	categories?: TenorCategory[];
}

function CategoryList({ categories }: CategoryListProps): JSX.Element {
	return (
		<div className='gpr-category-list'>
			{categories && categories.map((cat) => (
				<Category key={cat.name} image={cat.image} name={cat.name} />
			))}
		</div>
	);
}

export default CategoryList;
