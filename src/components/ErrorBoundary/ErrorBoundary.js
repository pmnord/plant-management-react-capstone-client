import React from 'react';

// Any class component with a componentDidCatch() lifecycle method 
// or static getDerivedStateFromError() can act as an error boundary.

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    } 

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <img src='../../Alnus_cordata_leaf_illustration.jpg' alt='A leaf' />
                    <h2>Something went wrong while trying to display this page.</h2>
                </div>
            );
        }
        return this.props.children || null;
    }
}