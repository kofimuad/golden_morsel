/**
 * Spinner sizes: sm | md (default) | lg
 * Spinner colors: gold (default) | dark | white
 */

const SIZES = {
  sm:  'w-4 h-4 border-[2px]',
  md:  'w-6 h-6 border-[2px]',
  lg:  'w-9 h-9 border-[3px]',
}

const COLORS = {
  gold:  'border-primary/30 border-t-primary',
  dark:  'border-black/20 border-t-black',
  white: 'border-white/20 border-t-white',
}

export default function Spinner({ size = 'md', color = 'gold', className = '' }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        'inline-block rounded-full animate-spin',
        SIZES[size] ?? SIZES.md,
        COLORS[color] ?? COLORS.gold,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}