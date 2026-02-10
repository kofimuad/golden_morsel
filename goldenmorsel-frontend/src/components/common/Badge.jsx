import React from 'react';

const Badge = ({ children, variant = 'primary', size = 'md', className = '' }) => {
  const variants = {
    primary: 'bg-primary-100 text-primary-700 border-primary-200',
    secondary: 'bg-dark-100 text-dark-700 border-dark-200',
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    danger: 'bg-red-100 text-red-700 border-red-200',
    info: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;