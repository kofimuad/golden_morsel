/**
 * Skeleton loading placeholder
 *
 * variants: text | card | circle | image
 *
 * Usage:
 *   <Skeleton variant="text" lines={3} />
 *   <Skeleton variant="card" />
 *   <Skeleton variant="circle" className="w-12 h-12" />
 *   <Skeleton variant="image" className="aspect-[3/4]" />
 */

export const Skeleton = ({ variant = 'text', lines = 1, className = '' }) => {
  const base =
    'bg-gray-200 dark:bg-surface-dark-3 animate-pulse rounded-sm'

  if (variant === 'circle') {
    return <div className={`${base} rounded-full ${className}`} />
  }

  if (variant === 'image') {
    return <div className={`${base} w-full ${className}`} />
  }

  if (variant === 'card') {
    return (
      <div className={`${base} rounded-sm overflow-hidden ${className}`}>
        <div className="aspect-[3/4] w-full bg-gray-300 dark:bg-surface-dark-2" />
        <div className="p-3 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-surface-dark-2 rounded-sm w-3/4" />
          <div className="h-3 bg-gray-300 dark:bg-surface-dark-2 rounded-sm w-1/2" />
          <div className="h-3 bg-gray-300 dark:bg-surface-dark-2 rounded-sm w-1/3" />
        </div>
      </div>
    )
  }

  // text variant — multiple lines
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${base} h-4 ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
        />
      ))}
    </div>
  )
}

export default Skeleton