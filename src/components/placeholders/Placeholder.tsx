import React from 'react';
import './Placeholder.css';

export interface PlaceholderProps  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    width?: number | string;
    height?: number | string;
	className?: string;
}

function Placeholder(props: PlaceholderProps) {
	return (
		<div
			{...props}
			className={`gpr-placeholder ${props.className || ''}`}
			style={{ width: props.width, height: props.height, ...props.style }}
		></div>
	);
}

export default Placeholder;
