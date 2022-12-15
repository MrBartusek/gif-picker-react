import React, { useContext } from 'react';
import PickerContext from '../../context/PickerContext';
import Button from '../Button';
import './Title.css';

export interface TitleProps {
	children: React.ReactNode;
}

function Title({ children }: TitleProps): JSX.Element {
	const [ pickerContext, setPickerContext ] = useContext(PickerContext);

	function onClear(): void {
		const contextCopy = Object.assign({}, pickerContext);
		contextCopy.showTrending = false;
		setPickerContext(contextCopy);
	}

	return (
		<div className='gpr-title-container'>
			<div className='gpr-title'>
				{children}
			</div>

			<Button className={'gpr-btn-clear-search'} onClick={onClear}>
				<div className="gpr-icn-clear-search" />
			</Button>
		</div>
	);
}

export default Title;
