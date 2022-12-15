import React, { useContext } from 'react';
import SettingsContext from '../../context/SettingsContext';
import './CategoryPlaceholder.css';
import Placeholder from './Placeholder';

function CategoryPlaceholder() {
	const settings = useContext(SettingsContext);

	return (
		<Placeholder className="gpr-category-placeholder" height={settings.categoryHeight} width='100%' />
	);
}

export default CategoryPlaceholder;
