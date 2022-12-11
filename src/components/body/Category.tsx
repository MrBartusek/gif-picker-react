import React, { useContext } from 'react';
import PickerContext from '../../context/PickerContext';
import SettingsContext from '../../context/SettingsContext';
import './Category.css';

export interface CategoryProps {
	image: string;
	name: string;
}

function Category({ image, name}: CategoryProps): JSX.Element {
	const settings = useContext(SettingsContext);
	const [ pickerContext, setPickerContext ] = useContext(PickerContext);

	function onClick(): void {
		const contextCopy = Object.assign({}, pickerContext);
		contextCopy.searchTerm = name;
		setPickerContext(contextCopy);
	}

	return (
		<button
			className='gpr-btn gpr-category'
			style={{height: settings.categoryHeight}}
			onClick={onClick}
		>
			<img src={image}/>
			<div className='gpr-category-overlay'>
				<div className='gpr-category-name'>
					{name}
				</div>
			</div>
		</button>
	);
}

export default Category;
