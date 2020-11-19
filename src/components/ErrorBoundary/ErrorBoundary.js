import React from "react";
import { Link } from "react-router-dom";

import "./ErrorBoundary.css";

/* Any class component with a componentDidCatch() lifecycle method
   or static getDerivedStateFromError() can act as an error boundary. */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  static getDerivedStateFromProps(props) {
    if (props.error) return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <div className="koala">
            <div className="koala__ear koala__ear--1"></div>
            <div className="koala__ear koala__ear--2"></div>
            <div className="koala__eye koala__eye--1"></div>
            <div className="koala__eye koala__eye--2"></div>
            <div className="koala__nose"></div>
          </div>
          <Link to="/">Go Home</Link>
          {this.props.error === 'foo' && <p>This page is only for debugging purposes.<br/>No actual error occured.</p>}
        </div>
      );
    }
    return this.props.children || null;
  }
}

export default ErrorBoundary;
