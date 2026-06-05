import React from 'react';
import { Gif, GifCategory } from '../../types/types';
import CategoryPlaceholder from '../placeholders/CategoryPlaceholder';
import './CategoryList.css';
import FeaturedCategory from './FeaturedCategory';
import TrendingCategory from './TrendingCategory';

export interface CategoryListProps {
	categories?: GifCategory[];
	trending?: Gif;
	columnsCount: number;
}

function CategoryList({
	categories,
	trending,
	columnsCount,
}: CategoryListProps): React.JSX.Element {
	/**
	 * Make sure that last categories row is always full by removing
	 * excess categories so the total count is devisable by column count
	 */
	function getCleanedCategories() {
		if (!categories) return undefined;

		const SPECIAL_CATEGORIES_COUNT = 1; // Trending
		const totalCategoriesCount = categories.length + SPECIAL_CATEGORIES_COUNT;
		const excessCategoriesCount = totalCategoriesCount % columnsCount;

		if (excessCategoriesCount == 0) return categories;
		return categories?.slice(0, -excessCategoriesCount);
	}

	return (
		<div
			className="gpr-category-list"
			style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}
		>
			{categories && trending ? (
				<>
					<TrendingCategory image={trending.imageUrl} />
					{getCleanedCategories()?.map((cat, i) => (
						<FeaturedCategory
							key={i}
							image={cat.imageUrl}
							name={cat.name}
						/>
					))}
				</>
			) : (
				<>
					{[...Array(10 * columnsCount)].map((_, i) => (
						<CategoryPlaceholder key={i} />
					))}
				</>
			)}
		</div>
	);
}

export default CategoryList;
