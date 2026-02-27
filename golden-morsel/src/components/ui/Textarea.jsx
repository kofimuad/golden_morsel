import { forwardRef } from 'react'

export const Textarea = forwardRef(function Textarea(
  { label, error, hint, fullWidth = true, rows = 3, className = '', id, ...props },
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
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={[
          'w-full bg-gray-50 dark:bg-surface-dark-3 text-gray-900 dark:text-white',
          'border rounded-sm px-4 py-3 text-sm font-sans resize-none',
          'placeholder-gray-400 dark:placeholder-gray-600',
          'focus:outline-none focus:ring-1 transition-all duration-200',
          borderClass,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
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