/**
 * StarRating — display only (read-only) or interactive
 *
 * Props:
 *   value     - number (0-5)
 *   max       - number (default 5)
 *   size      - sm | md (default) | lg
 *   onChange  - fn(newValue) — if provided, makes it interactive
 *   showValue - bool — show numeric value beside stars
 */

import { useState } from 'react'

const SIZES = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
}

export const StarRating = ({
  value = 0,
  max = 5,
  size = 'md',
  onChange,
  showValue = false,
  className = '',
}) => {
  const [hovered, setHovered] = useState(null)
  const interactive = typeof onChange === 'function'
  const display = hovered ?? value

  return (
    <div
      className={`inline-flex items-center gap-0.5 ${className}`}
      onMouseLeave={() => interactive && setHovered(null)}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < display
        return (
          <span
            key={i}
            className={[
              'material-icons-outlined leading-none transition-colors duration-100',
              SIZES[size],
              filled ? 'text-primary' : 'text-gray-300 dark:text-gray-600',
              interactive ? 'cursor-pointer hover:scale-110 transition-transform' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onClick={() => interactive && onChange(i + 1)}
          >
            {filled ? 'star' : 'star_border'}
          </span>
        )
      })}
      {showValue && (
        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400 font-sans">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default StarRating