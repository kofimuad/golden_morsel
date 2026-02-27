import { formatPrice } from '../../utils/formatters'

export function OrderItemsList({ items = [] }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-border-dark last:border-0"
        >
          {/* Image */}
          <div className="w-14 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-gray-100 dark:bg-surface-dark-3">
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="material-icons-outlined text-gray-300 text-sm">
                  image_not_supported
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-sans font-medium text-gray-900 dark:text-white truncate">
              {item.title}
            </p>
            {item.variant && (
              <p className="text-[10px] text-gray-400 font-sans uppercase tracking-wide">
                {item.variant}
              </p>
            )}
            <p className="text-xs text-gray-400 font-sans mt-0.5">
              Qty: {item.quantity} × {formatPrice(item.price)}
            </p>
          </div>

          {/* Subtotal */}
          <p className="text-sm font-medium text-primary font-sans flex-shrink-0">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      ))}
    </div>
  )
}