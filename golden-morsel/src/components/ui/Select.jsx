import { forwardRef } from 'react'

export const Select = forwardRef(function Select(
  { label, error, hint, options = [], fullWidth = true, className = '', id, placeholder, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

  const borderClass = error
    ? 'border-red-500/70 focus:ring-red-500/50 focus:border-red-500'
    : 'border-gray-200 dark:border-border-dark focus:ring-primary/50 focus:border-primary'

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[10px] uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5 ml-0.5 font-sans"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={[
            'w-full appearance-none bg-gray-50 dark:bg-surface-dark-3 text-gray-900 dark:text-white',
            'border rounded-sm px-4 py-3 text-sm font-sans pr-10',
            'focus:outline-none focus:ring-1 transition-all duration-200',
            borderClass,
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </option>
          ))}
        </select>
        {/* Chevron icon */}
        <span className="material-icons-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] pointer-events-none">
          expand_more
        </span>
      </div>
      {error && (
        <p className="mt-1.5 ml-0.5 text-xs text-red-400 font-sans flex items-center gap-1">
          <span className="material-icons-outlined text-[13px]">error_outline</span>
          {error}
        </p>
      )}
      {!error && hint && (
        <p className="mt-1.5 ml-0.5 text-xs text-gray-400 font-sans">{hint}</p>
      )}
    </div>
  )
})

export default Select