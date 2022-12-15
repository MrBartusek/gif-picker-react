import React from 'react';
import Placeholder from './Placeholder';
import './ResultPlaceholder.css';

export interface ResultPlaceholderProps {
	height: number | string;
}

function ResultPlaceholder({ height }: ResultPlaceholderProps) {
	return (
		<Placeholder className="gpr-result-placeholder" height={height} width='100%' />
	);
}

export default ResultPlaceholder;
