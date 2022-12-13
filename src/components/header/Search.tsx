import React, { useContext } from 'react';
import PickerContext from '../../context/PickerContext';
import Button from '../Button';
import './Search.css';

function Search(): JSX.Element {
	const [ pickerContext, setPickerContext ] = useContext(PickerContext);

	function onChange(event: React.ChangeEvent<HTMLInputElement>): void {
		const contextCopy = Object.assign({}, pickerContext);
		contextCopy.searchTerm = event.target.value;
		setPickerContext(contextCopy);
	}

	function onClear(): void {
		const contextCopy = Object.assign({}, pickerContext);
		contextCopy.searchTerm = '';
		setPickerContext(contextCopy);
	}

	return (
		<div className='gpr-search-container'>
			<input
				autoFocus={true}
				aria-label={'Search Tenor'}
				placeholder={'Search Tenor'}
				className="gpr-search"
				data-testid="gpr-search-input"
				type="text"
				value={pickerContext.searchTerm}
				onChange={onChange}
			/>
			<div className="gpr-icn-search" />
			{pickerContext.searchTerm.length > 0 && (
				<Button className={'gpr-btn-clear-search'} onClick={onClear}>
					<div className="gpr-icn-clear-search" />
				</Button>
			)}
		</div>
	);
}

export default Search;
