import * as React from 'react';

export interface ErrorBoundaryProps {
	children: React.ReactNode;
}

export interface ErrorBoundaryState {
	hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: { children: React.ReactNode }) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(): ErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: any): void {
		// eslint-disable-next-line no-console
		console.error('GIF Picker React failed to render:', error, errorInfo);
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return null;
		}

		return this.props.children;
	}
}
