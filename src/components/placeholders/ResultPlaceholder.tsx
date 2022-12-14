import React, { useContext } from 'react';
import SettingsContext from '../../context/SettingsContext';
import Placeholder from './Placeholder';
import './ResultPlaceholder.css';

export interface ResultPlaceholderProps {
	height: number | string;
}

function ResultPlaceholder({ height }: ResultPlaceholderProps) {
	const settings = useContext(SettingsContext);

	return (
		<Placeholder className="gpr-result-placeholder" height={height} width='100%' />
	);
}

export default ResultPlaceholder;
