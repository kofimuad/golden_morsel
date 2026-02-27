import { forwardRef } from 'react'
import Spinner from './Spinner'

/**
 * Button variants:
 *  - primary   : gold filled (default)
 *  - secondary : gold outlined
 *  - ghost     : transparent, gold text
 *  - danger    : red toned
 *  - dark      : dark surface filled
 *
 * Sizes: sm | md (default) | lg
 */

const BASE =
  'inline-flex items-center justify-center gap-2 font-sans font-medium tracking-widest uppercase text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed select-none'

const VARIANTS = {
  primary:
    'shimmer-btn bg-primary hover:bg-primary-light active:scale-[0.98] text-black shadow-gold-glow hover:shadow-gold-glow-lg',
  secondary:
    'border border-primary text-primary hover:bg-primary/10 active:scale-[0.98] bg-transparent',
  ghost:
    'text-primary hover:bg-primary/10 active:scale-[0.98] bg-transparent border-transparent',
  danger:
    'bg-red-700/20 border border-red-500/40 text-red-400 hover:bg-red-700/30 active:scale-[0.98]',
  dark:
    'bg-surface-dark-2 border border-border-dark text-gray-200 hover:border-primary/40 hover:text-primary active:scale-[0.98]',
}

const SIZES = {
  sm:  'h-8  px-4  text-[10px] rounded-sm',
  md:  'h-11 px-6  text-xs     rounded-sm',
  lg:  'h-14 px-8  text-xs     rounded-sm',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    fullWidth = false,
    leftIcon = null,
    rightIcon = null,
    className = '',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={[
        BASE,
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" color={variant === 'primary' ? 'dark' : 'gold'} />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="material-icons-outlined text-xl leading-none flex-shrink-0">{leftIcon}</span>
          )}
          {children}
          {rightIcon && (
            <span className="material-icons-outlined text-xl leading-none flex-shrink-0">{rightIcon}</span>
          )}
        </>
      )}
    </button>
  )
})

export default Button