import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatters'

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart()

  return (
    <div className="flex gap-4 py-4 border-b border-gray-100 dark:border-border-dark last:border-0">

      {/* Image */}
      <div className="w-20 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-gray-100 dark:bg-surface-dark-3">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-icons-outlined text-gray-300 dark:text-gray-600">
              image_not_supported
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h4 className="font-serif text-sm text-gray-900 dark:text-white leading-snug line-clamp-2">
            {item.title}
          </h4>

          {/* Variant */}
          {item.variant && (
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mt-0.5">
              {item.variant}
            </p>
          )}
        </div>

        {/* Qty + price row */}
        <div className="flex items-center justify-between mt-2">
          {/* Qty stepper */}
          <div className="flex items-center gap-0">
            <button
              onClick={() => updateQty(item.key, item.quantity - 1)}
              className="w-7 h-7 border border-gray-200 dark:border-border-dark flex items-center justify-center text-gray-500 hover:border-primary/50 hover:text-primary transition-colors rounded-l-sm text-sm"
              aria-label="Decrease quantity"
            >
              <span className="material-icons-outlined text-sm">remove</span>
            </button>
            <div className="w-9 h-7 border-t border-b border-gray-200 dark:border-border-dark flex items-center justify-center text-xs font-sans font-medium text-gray-900 dark:text-white">
              {item.quantity}
            </div>
            <button
              onClick={() => updateQty(item.key, item.quantity + 1)}
              className="w-7 h-7 border border-gray-200 dark:border-border-dark flex items-center justify-center text-gray-500 hover:border-primary/50 hover:text-primary transition-colors rounded-r-sm"
              aria-label="Increase quantity"
            >
              <span className="material-icons-outlined text-sm">add</span>
            </button>
          </div>

          {/* Price */}
          <p className="text-sm font-medium text-primary font-sans">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => removeItem(item.key)}
        className="self-start p-1 text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors flex-shrink-0"
        aria-label="Remove item"
      >
        <span className="material-icons-outlined text-lg">close</span>
      </button>
    </div>
  )
}