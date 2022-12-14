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
}

function CategoryList({ categories, trending }: CategoryListProps): JSX.Element {
	return (
		<div className='gpr-category-list'>
			{categories && trending ? (
				<>
					<TrendingCategory image={trending.url} />
					{categories.map((cat, i) => (
						<FeaturedCategory key={i} image={cat.image} name={cat.name} />
					))}
				</>
			) : (
				<>
					{[ ...Array(10) ].map((_, i) => (
						<CategoryPlaceholder key={i} />
					))}
				</>
			)}
		</div>
	);
}

export default CategoryList;
