import { Link } from 'react-router-dom'
import { formatPrice, formatDate } from '../../utils/formatters'
import Badge from '../ui/Badge'

export function OrderCard({ order }) {
  return (
    <Link
      to={`/orders/${order._id}`}
      className="block bg-white dark:bg-surface-dark-2 border border-gray-100 dark:border-border-dark rounded-sm p-5 hover:border-primary/30 transition-colors group"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        {/* Order ID + date */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-0.5">
            Order
          </p>
          {order.orderId || `#${order._id?.slice(-8).toUpperCase()}`}
          <p className="text-xs text-gray-400 font-sans mt-0.5">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <Badge status={order.status} />
      </div>

      {/* Items preview */}
      <div className="flex gap-1.5 mb-4">
        {order.items?.slice(0, 4).map((item, i) => (
          <div
            key={i}
            className="w-10 h-12 rounded-sm overflow-hidden bg-gray-100 dark:bg-surface-dark-3 flex-shrink-0"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-surface-dark-2" />
            )}
          </div>
        ))}
        {order.items?.length > 4 && (
          <div className="w-10 h-12 rounded-sm bg-gray-100 dark:bg-surface-dark-3 flex items-center justify-center text-[10px] text-gray-400 font-sans">
            +{order.items.length - 4}
          </div>
        )}
      </div>

      {/* Total + arrow */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-primary font-sans">
          {formatPrice(order.total)}
        </p>
        <span className="material-icons-outlined text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors text-lg">
          arrow_forward
        </span>
      </div>
    </Link>
  )
}