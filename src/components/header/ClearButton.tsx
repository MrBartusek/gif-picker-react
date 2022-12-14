import React from 'react';
import Button from '../Button';
import './ClearButton.css';

export interface ClearButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>
}

function ClearButton({ onClick }: ClearButtonProps) {
	return (
		<Button className="gpr-btn-clear-search" onClick={onClick}>
			<div className="gpr-icn-clear-search" />
		</Button>
	);
}

export default ClearButton;
