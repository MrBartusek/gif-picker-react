import React, { useContext } from 'react';
import PickerContext from '../../context/PickerContext';
import Category from './Category';

export interface FeaturedCategory {
	image: string;
	name: string;
}

function FeaturedCategory({ image, name }: FeaturedCategory): JSX.Element {
	const [ pickerContext, setPickerContext ] = useContext(PickerContext);

	function onClick(): void {
		const contextCopy = Object.assign({}, pickerContext);
		contextCopy.searchTerm = name;
		setPickerContext(contextCopy);
	}

	return (
		<Category image={image} text={name} onClick={onClick} />
	);
}

export default FeaturedCategory;
