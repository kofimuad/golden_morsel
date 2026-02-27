import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { useCart } from '../../hooks/useCart'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import Button from '../ui/Button'
import gmMonogram from '../../assets/logos/gm-monogram-gold.png'

export default function CartDrawer({ open, onClose }) {
  const { items, itemCount, subtotal, clearCart } = useCart()
  const navigate = useNavigate()

  // Lock body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer — slides in from the right */}
      <div className="relative ml-auto w-full max-w-sm h-full bg-background-light dark:bg-surface-dark-2 shadow-2xl flex flex-col">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-border-dark">
          <div className="flex items-center gap-3">
            <img src={gmMonogram} alt="GM" className="h-6 w-6 object-contain opacity-70" />
            <div>
              <h2 className="font-display text-base text-gray-900 dark:text-white">
                Your Cart
              </h2>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <span className="material-icons-outlined text-xl">close</span>
          </button>
        </div>

        {/* ── Items ─────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {items.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <span className="material-icons-outlined text-5xl text-gray-200 dark:text-gray-700">
                shopping_bag
              </span>
              <p className="font-serif text-lg text-gray-400 dark:text-gray-600">
                Your cart is empty
              </p>
              <p className="text-xs text-gray-400 font-sans uppercase tracking-widest">
                Add something golden
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => { onClose(); navigate('/products') }}
              >
                Browse Products
              </Button>
            </div>
          ) : (
            <div>
              {items.map(item => (
                <CartItem key={item.key} item={item} />
              ))}

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="mt-4 text-[10px] uppercase tracking-widest text-gray-400 hover:text-red-400 transition-colors font-sans flex items-center gap-1"
              >
                <span className="material-icons-outlined text-sm">delete_outline</span>
                Clear Cart
              </button>
            </div>
          )}
        </div>

        {/* ── Footer — summary + CTA ────────────────────────────── */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 dark:border-border-dark px-6 py-5 space-y-5">
            <CartSummary subtotal={subtotal} compact />

            {/* WhatsApp note */}
            <div className="flex items-center gap-2 p-3 rounded-sm bg-primary/5 border border-primary/15">
              <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 fill-current text-primary" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.571a.75.75 0 00.918.919l5.733-1.474A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.24-1.375l-.372-.214-3.853.99.998-3.827-.229-.38A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
                Payment instructions sent to your WhatsApp after checkout
              </p>
            </div>

            {/* Checkout button */}
            <Button
              fullWidth
              size="lg"
              onClick={handleCheckout}
              rightIcon="arrow_forward"
            >
              Proceed to Checkout
            </Button>

            {/* Continue shopping */}
            <button
              onClick={onClose}
              className="w-full text-center text-xs text-gray-400 hover:text-primary transition-colors font-sans uppercase tracking-widest"
            >
              Continue Shopping
            </button>
          </div>
        )}

        {/* Gold accent line at top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </div>,
    document.body
  )
}