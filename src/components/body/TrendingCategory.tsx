import React, { useContext } from 'react';
import PickerContext from '../../context/PickerContext';
import Category from './Category';
import './TrendingCategory.css';

export interface FeaturedCategory {
	image: string;
}

function TrendingCategory({ image }: FeaturedCategory): JSX.Element {
	const [ pickerContext, setPickerContext ] = useContext(PickerContext);

	function onClick(): void {
		const contextCopy = Object.assign({}, pickerContext);
		contextCopy.showTrending = true;
		setPickerContext(contextCopy);
	}

	return (
		<Category image={image} onClick={onClick} text={(
			<div className='gpr-text-trending-category'>
				<div className="gpr-icn-trending" />
				<span>Trending GIFs</span>
			</div>
		)} />
	);
}

export default TrendingCategory;
