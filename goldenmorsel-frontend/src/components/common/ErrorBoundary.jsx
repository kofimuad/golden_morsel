import React from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // You can also log the error to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = process.env.NODE_ENV === 'development';

      return (
        <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-400" />
              </div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Oops! Something went wrong
            </h1>

            <p className="text-cream-300 mb-6">
              We're sorry for the inconvenience. Our team has been notified and
              is working to fix the issue.
            </p>

            {/* Development Error Details */}
            {isDevelopment && this.state.error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left">
                <h3 className="text-red-400 font-semibold mb-2">
                  Error Details (Development Only):
                </h3>
                <p className="text-red-300 text-sm font-mono break-words mb-3">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="text-red-300 text-xs">
                    <summary className="cursor-pointer font-semibold mb-2">
                      Stack Trace
                    </summary>
                    <pre className="overflow-auto bg-dark-900 p-2 rounded font-mono text-xs">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Again</span>
              </button>

              <a
                href="/"
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg font-medium transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Go Home</span>
              </a>
            </div>

            {/* Support Info */}
            <p className="text-cream-400 text-sm mt-6">
              If the problem persists, please{' '}
              <a
                href="/contact"
                className="text-primary-400 hover:text-primary-300 underline"
              >
                contact our support team
              </a>
              .
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;