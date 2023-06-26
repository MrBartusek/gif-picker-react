import React, { useContext } from 'react';
import PickerContext from '../../context/PickerContext';
import SettingsContext from '../../context/SettingsContext';
import ClearButton from './ClearButton';
import './Search.css';

function Search(): JSX.Element {
	const [ pickerContext, setPickerContext ] = useContext(PickerContext);
	const settings = useContext(SettingsContext);

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
				autoFocus={settings.autoFocusSearch}
				aria-label={'Search Tenor'}
				placeholder={'Search Tenor'}
				className="gpr-search"
				data-testid="gpr-search-input"
				type="text"
				dir="auto"
				maxLength={500}
				value={pickerContext.searchTerm}
				onChange={onChange}
			/>
			<div className="gpr-icn-search" />
			{pickerContext.searchTerm.length > 0 && (
				<ClearButton onClick={onClear} />
			)}
		</div>
	);
}

export default Search;
