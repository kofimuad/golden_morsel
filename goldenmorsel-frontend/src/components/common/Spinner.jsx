import React from 'react';

const Spinner = ({ size = 'md', color = 'primary' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colors = {
    primary: 'border-primary-500',
    white: 'border-white',
    dark: 'border-dark-700',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizes[size]} animate-spin rounded-full border-4 border-t-transparent ${colors[color]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;