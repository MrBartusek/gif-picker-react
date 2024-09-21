import React, { useEffect, useState } from 'react';
import Placeholder from './Placeholder';
import './ResultPlaceholder.css';

export interface ResultPlaceholderProps {
	height: number | string;
	showDelay?: number;
}

function ResultPlaceholder({ height, showDelay }: ResultPlaceholderProps) {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (show) return;
		function showElement() {
			setShow(true);
		}
		const timeout = setTimeout(showElement, showDelay);
		return () => clearTimeout(timeout);
	}, []);

	return (
		<Placeholder
			className="gpr-result-placeholder"
			height={height}
			width="100%"
			style={{ opacity: show ? 1 : 0 }}
		/>
	);
}

export default ResultPlaceholder;
