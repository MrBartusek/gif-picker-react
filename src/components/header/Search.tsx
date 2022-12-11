import React, { useContext } from 'react';
import PickerContext from '../../context/PickerContext';
import './Search.css';

function Search(): JSX.Element {
	const [ pickerContext, setPickerContext ] = useContext(PickerContext);

	function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const contextCopy = Object.assign({}, pickerContext);
		contextCopy.searchTerm = event.target.value;
		setPickerContext(contextCopy);
	}

	return (
		<div className='gpr-search-container'>
			<input
				autoFocus={true}
				aria-label={'Search Tenor'}
				placeholder={'Search Tenor'}
				className="gpr-search"
				type="text"
				value={pickerContext.searchTerm}
				onChange={onChange}
			/>
			<div className="gpr-icn-search" />
		</div>
	);
}

export default Search;
