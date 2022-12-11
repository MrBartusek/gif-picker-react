import React from 'react';
import Search from './Search';
import './Header.css';

function Header(): JSX.Element {
	return (
		<div className='gpr-header'>
			<Search />
		</div>
	);
}

export default Header;
