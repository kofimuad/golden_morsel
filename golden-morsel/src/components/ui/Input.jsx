import { forwardRef } from 'react'

/**
 * Input field with optional label, prefix, suffix icon, error and hint text.
 *
 * Props:
 *  label       - string
 *  error       - string  (shows red border + message)
 *  hint        - string  (shows grey helper text)
 *  prefix      - string  (plain text prefix, e.g. "+233")
 *  leftIcon    - material icon name
 *  rightIcon   - material icon name
 *  fullWidth   - bool (default true)
 */

const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    prefix,
    leftIcon,
    rightIcon,
    fullWidth = true,
    className = '',
    id,
    ...props
  },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const borderClass = error
    ? 'border-red-500/70 focus:ring-red-500/50 focus:border-red-500'
    : 'border-gray-200 dark:border-border-dark focus:ring-primary/50 focus:border-primary'

  const hasPadLeft  = prefix || leftIcon
  const hasPadRight = rightIcon

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5 ml-0.5 font-sans"
        >
          {label}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative flex items-center">
        {/* Left icon */}
        {leftIcon && !prefix && (
          <span className="material-icons-outlined absolute left-3 text-gray-400 dark:text-gray-500 text-[18px] pointer-events-none">
            {leftIcon}
          </span>
        )}

        {/* Prefix (e.g. "+233") */}
        {prefix && (
          <div className="absolute left-0 inset-y-0 flex items-center pl-4 pointer-events-none">
            <span className="text-gray-500 dark:text-gray-400 text-sm font-sans">{prefix}</span>
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={[
            'w-full bg-gray-50 dark:bg-surface-dark-3 text-gray-900 dark:text-white',
            'border rounded-sm px-4 py-3 text-sm font-sans',
            'placeholder-gray-400 dark:placeholder-gray-600',
            'focus:outline-none focus:ring-1 transition-all duration-200',
            borderClass,
            hasPadLeft  && !prefix ? 'pl-10' : '',
            prefix               ? 'pl-14' : '',
            hasPadRight          ? 'pr-10' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {/* Right icon */}
        {rightIcon && (
          <span className="material-icons-outlined absolute right-3 text-gray-400 dark:text-gray-500 text-[18px] pointer-events-none">
            {rightIcon}
          </span>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1.5 ml-0.5 text-xs text-red-400 font-sans flex items-center gap-1">
          <span className="material-icons-outlined text-[13px]">error_outline</span>
          {error}
        </p>
      )}

      {/* Hint text */}
      {!error && hint && (
        <p className="mt-1.5 ml-0.5 text-xs text-gray-400 font-sans">{hint}</p>
      )}
    </div>
  )
})

export default Input