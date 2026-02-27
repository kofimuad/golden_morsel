import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatters'
import CartSummary from '../cart/CartSummary'

export function OrderSummaryPanel({ items = [], subtotal = 0 }) {
  return (
    <div className="bg-gray-50 dark:bg-surface-dark-3 rounded-sm border border-gray-100 dark:border-border-dark p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-base text-gray-900 dark:text-white">
          Order Summary
        </h2>
        <Link
          to="/products"
          className="text-[10px] uppercase tracking-widest text-gray-400 hover:text-primary transition-colors font-sans"
        >
          Edit
        </Link>
      </div>

      {/* Items list */}
      <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar">
        {items.map(item => (
          <div key={item.key} className="flex items-center gap-3">
            {/* Image */}
            <div className="w-12 h-14 flex-shrink-0 rounded-sm overflow-hidden bg-gray-200 dark:bg-surface-dark-2">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-sans font-medium text-gray-900 dark:text-white truncate">
                {item.title}
              </p>
              {item.variant && (
                <p className="text-[10px] text-gray-400 font-sans uppercase tracking-wide">
                  {item.variant}
                </p>
              )}
              <p className="text-[10px] text-gray-400 font-sans">
                Qty: {item.quantity}
              </p>
            </div>
            {/* Subtotal */}
            <p className="text-xs font-medium text-primary font-sans flex-shrink-0">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 dark:bg-border-dark" />

      {/* Totals */}
      <CartSummary subtotal={subtotal} />
    </div>
  )
}