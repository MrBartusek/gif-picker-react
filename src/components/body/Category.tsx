import React from 'react';
import './Category.css';

function Category(): JSX.Element {
	return (
		<div className='gpr-category'>
			<img src={'https://picsum.photos/400/800?r=' + Math.random()}/>
		</div>
	);
}

export default Category;
