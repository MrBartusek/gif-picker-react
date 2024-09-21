import * as React from 'react';

interface PropsProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

function Button(props: PropsProps): JSX.Element {
	return (
		<button
			type="button"
			{...props}
			className={'gpr-btn ' + props.className}
		>
			{props.children}
		</button>
	);
}

export default Button;
