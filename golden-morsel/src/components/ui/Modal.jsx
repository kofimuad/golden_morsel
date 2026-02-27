import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

/**
 * Modal — portal-based overlay dialog
 *
 * Props:
 *   open        - bool
 *   onClose     - fn
 *   title       - string
 *   description - string (optional subtitle)
 *   size        - sm | md (default) | lg | xl
 *   children    - content
 *   footer      - footer slot (JSX)
 *   closeOnBackdrop - bool (default true)
 */

const SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

export default function Modal({
  open,
  onClose,
  title,
  description,
  size = 'md',
  children,
  footer,
  closeOnBackdrop = true,
}) {
  const panelRef = useRef(null)

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={[
          'relative w-full z-10',
          'bg-surface-dark-2 border border-border-dark rounded-sm',
          'shadow-2xl shadow-black/60',
          'animate-in fade-in zoom-in-95 duration-200',
          SIZES[size] ?? SIZES.md,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Header */}
        {(title || description) && (
          <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-border-dark">
            <div>
              {title && (
                <h2
                  id="modal-title"
                  className="font-display text-lg text-white leading-snug"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-xs text-gray-400 font-sans">{description}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="ml-4 p-1 rounded-sm text-gray-500 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <span className="material-icons-outlined text-xl">close</span>
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-5 font-sans text-sm text-gray-300">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 pb-6 pt-2 flex items-center justify-end gap-3 border-t border-border-dark">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}