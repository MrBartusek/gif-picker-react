import React from 'react';
import Category from './Category';
import './CategoryList.css';

function CategoryList(): JSX.Element {
	return (
		<div className='gpr-category-list'>
			<Category />
			<Category />
			<Category />
			<Category />
			<Category />
			<Category />
			<Category />
			<Category />
			<Category />
		</div>
	);
}

export default CategoryList;
