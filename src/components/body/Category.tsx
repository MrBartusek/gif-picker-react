import React, { useContext } from 'react';
import SettingsContext from '../../context/SettingsContext';
import './Category.css';

export interface CategoryProps {
	image: string;
	text: React.ReactNode | string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Category({ image, text, onClick }: CategoryProps): JSX.Element {
	const settings = useContext(SettingsContext);

	return (
		<button
			type="button"
			className="gpr-btn gpr-category"
			style={{ height: settings.categoryHeight }}
			data-testid="gpr-category"
			onClick={onClick}
		>
			<img
				src={image}
				loading="lazy"
			/>
			<div className="gpr-category-overlay">
				<div className="gpr-category-name">{text}</div>
			</div>
		</button>
	);
}

export default Category;
