import React from 'react';
import './Placeholder.css';

export interface PlaceholderProps {
    width?: number | string;
    height?: number | string;
	className?: string;
}

function Placeholder({ width, height, className }: PlaceholderProps) {
	return (
		<div className={`gpr-placeholder ${className || ''}`} style={{ width, height }}></div>
	);
}

export default Placeholder;
