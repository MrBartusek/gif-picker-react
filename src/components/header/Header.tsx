import React, { useContext } from 'react';
import Search from './Search';
import './Header.css';
import PickerContext from '../../context/PickerContext';
import Title from './Title';

function Header(): JSX.Element {
	const [ pickerContext ] = useContext(PickerContext);

	return (
		<div className='gpr-header'>
			{pickerContext.showTrending ? (
				<Title>Trending GIFs</Title>
			) : (
				<Search />
			)}
		</div>
	);
}

export default Header;
