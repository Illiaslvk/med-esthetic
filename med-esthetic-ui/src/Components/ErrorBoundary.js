import React, { Component } from 'react';
import Cookies from 'js-cookie';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the ui
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Caught an error:", error, errorInfo);

        // Clear
        Cookies.remove('auth_token');
        Cookies.remove('refresh_token');
        localStorage.clear();
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
