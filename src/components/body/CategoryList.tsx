import React from 'react';
import { TenorCategory } from '../../managers/TenorManager';
import CategoryPlaceholder from '../placeholders/CategoryPlaceholder';
import Category from './Category';
import './CategoryList.css';

export interface CategoryListProps {
	categories?: TenorCategory[];
}

function CategoryList({ categories }: CategoryListProps): JSX.Element {
	return (
		<div className='gpr-category-list'>
			{categories ? categories.map((cat) => (
				<Category key={cat.name} image={cat.image} name={cat.name} />
			)) : (
				<>
					{[ ...Array(10) ].map((i) => (
						<CategoryPlaceholder key={i} />
					))}
				</>
			)}
		</div>
	);
}

export default CategoryList;
