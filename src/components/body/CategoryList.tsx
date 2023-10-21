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
	/**
     * Make sure that last categories row is always full by removing
     * excess categories so the total count is devisable by collumn count
     */
	function getCleanedCategories() {
		if(!categories) return undefined;

		const SPECIAL_CATEGORIES_COUNT = 1; // Trending
		const totalCategoriesCount = categories.length + SPECIAL_CATEGORIES_COUNT;
		const excessCategoriesCount = totalCategoriesCount % columnsCount;

		if(excessCategoriesCount == 0) return categories;
		return categories?.slice(0, -excessCategoriesCount);
	}

	return (
		<div className='gpr-category-list' style={{gridTemplateColumns: `repeat(${columnsCount}, 1fr)`}}>
			{categories && trending ? (
				<>
					<TrendingCategory image={trending.url} />
					{getCleanedCategories()?.map((cat, i) => (
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
