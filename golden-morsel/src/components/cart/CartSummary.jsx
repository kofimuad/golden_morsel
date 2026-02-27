import { formatPrice } from '../../utils/formatters'
import { calcVAT, calcShipping, calcTotal } from '../../utils/orderHelpers'

/**
 * CartSummary
 * Reusable totals block used in both CartDrawer and CheckoutPage
 *
 * Props:
 *   subtotal  - number
 *   showVat   - bool (default true)
 *   compact   - bool — smaller text for drawer
 */
export default function CartSummary({ subtotal = 0, showVat = true, compact = false }) {
  const vat      = calcVAT(subtotal)
  const shipping = calcShipping(subtotal)
  const total    = calcTotal(subtotal)

  const labelClass = compact
    ? 'text-xs text-gray-500 dark:text-gray-400 font-sans'
    : 'text-sm text-gray-600 dark:text-gray-400 font-sans'

  const valueClass = compact
    ? 'text-xs text-gray-700 dark:text-gray-300 font-sans'
    : 'text-sm text-gray-700 dark:text-gray-300 font-sans'

  return (
    <div className="space-y-2.5">
      {/* Subtotal */}
      <div className="flex justify-between">
        <span className={labelClass}>Subtotal</span>
        <span className={valueClass}>{formatPrice(subtotal)}</span>
      </div>

      {/* VAT */}
      {showVat && (
        <div className="flex justify-between">
          <span className={labelClass}>VAT (6%)</span>
          <span className={valueClass}>{formatPrice(vat)}</span>
        </div>
      )}

      {/* Shipping */}
      <div className="flex justify-between">
        <span className={labelClass}>Delivery</span>
        <span className={shipping === 0 ? 'text-xs text-green-400 font-sans font-medium' : valueClass}>
          {shipping === 0 ? 'FREE 🎁' : formatPrice(shipping)}
        </span>
      </div>

      {/* Free shipping hint */}
      {shipping > 0 && (
        <p className="text-[10px] text-gray-400 font-sans">
          Free delivery on orders above GH₵ 200
        </p>
      )}

      {/* Divider */}
      <div className="h-px bg-gray-100 dark:bg-border-dark my-1" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-900 dark:text-white font-sans">Total</span>
        <span className="font-display text-xl text-primary font-semibold">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  )
}