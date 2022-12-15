import React, { useContext } from 'react';
import PickerContext from '../../context/PickerContext';
import './Header.css';
import Search from './Search';
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
