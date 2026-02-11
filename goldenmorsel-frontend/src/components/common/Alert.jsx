import React from 'react';
import { X, AlertCircle, CheckCircle, InfoIcon, AlertTriangle } from 'lucide-react';

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  dismissible = true,
  className = '',
}) => {
  const typeStyles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'text-blue-600',
      text: 'text-blue-800',
      Icon: InfoIcon,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: 'text-green-600',
      text: 'text-green-800',
      Icon: CheckCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'text-yellow-600',
      text: 'text-yellow-800',
      Icon: AlertTriangle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'text-red-600',
      text: 'text-red-800',
      Icon: AlertCircle,
    },
  };

  const style = typeStyles[type] || typeStyles.info;
  const Icon = style.Icon;

  return (
    <div
      className={`${style.bg} ${style.border} border rounded-lg p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <Icon className={`${style.icon} w-5 h-5 mt-0.5 mr-3 flex-shrink-0`} />
        <div className="flex-grow">
          {title && (
            <h3 className={`${style.text} font-semibold mb-1`}>
              {title}
            </h3>
          )}
          {message && (
            <p className={`${style.text} text-sm`}>
              {message}
            </p>
          )}
        </div>
        {dismissible && onClose && (
          <button
            onClick={onClose}
            className={`${style.icon} ml-3 flex-shrink-0 hover:opacity-75 transition-opacity`}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;