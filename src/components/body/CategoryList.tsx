import React from 'react';
import { TenorImage } from '../../../dist';
import { TenorCategory } from '../../managers/TenorManager';
import CategoryPlaceholder from '../placeholders/CategoryPlaceholder';
import './CategoryList.css';
import FeaturedCategory from './FeaturedCategory';
import TrendingCategory from './TrendingCategory';

export interface CategoryListProps {
	categories?: TenorCategory[];
	trending?: TenorImage;
	columnsCount: number;
}

function CategoryList({ categories, trending, columnsCount }: CategoryListProps): JSX.Element {
	// Reduce categories to multiple of columns so there won't by any not full rows at the bottom
	let categoriesSliced = categories;
	if(columnsCount > 1) {
		categoriesSliced = categories?.slice(0, -((categories.length + 1) % columnsCount));
	}

	return (
		<div className='gpr-category-list' style={{gridTemplateColumns: `repeat(${columnsCount}, 1fr)`}}>
			{categories && trending ? (
				<>
					<TrendingCategory image={trending.url} />
					{categoriesSliced?.map((cat, i) => (
						<FeaturedCategory key={i} image={cat.image} name={cat.name} />
					))}
				</>
			) : (
				<>
					{[ ...Array(10 * columnsCount) ].map((_, i) => (
						<CategoryPlaceholder key={i} />
					))}
				</>
			)}
		</div>
	);
}

export default CategoryList;
