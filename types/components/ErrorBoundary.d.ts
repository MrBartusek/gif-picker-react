import * as React from 'react';
export interface ErrorBoundaryProps {
    children: React.ReactNode;
}
export interface ErrorBoundaryState {
    hasError: boolean;
}
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: {
        children: React.ReactNode;
    });
    static getDerivedStateFromError(): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: any): void;
    render(): React.ReactNode;
}
