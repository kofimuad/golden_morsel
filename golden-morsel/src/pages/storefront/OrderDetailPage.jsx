import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrderById } from '../../services/orderService'
import { formatPrice, formatDate } from '../../utils/formatters'
import { OrderTimeline } from '../../components/order/OrderTimeline'
import { OrderItemsList } from '../../components/order/OrderItemsList'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { Skeleton } from '../../components/ui/Skeleton'

export function OrderDetailPage() {
  const { orderId } = useParams()
  const [order,   setOrder]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    getOrderById(orderId)
      .then(res => setOrder(res.data.data))
      .catch(() => setError('Order not found.'))
      .finally(() => setLoading(false))
  }, [orderId])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-4">
        <Skeleton variant="text" lines={2} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton variant="card" className="h-64" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <span className="material-icons-outlined text-5xl text-gray-300 dark:text-gray-700 mb-4 block">
          receipt_long
        </span>
        <h2 className="font-serif text-2xl text-gray-900 dark:text-white mb-2">Order Not Found</h2>
        <Link to="/track">
          <Button leftIcon="arrow_back" variant="secondary">Back to Tracking</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <Link
            to="/track"
            className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gray-400 hover:text-primary transition-colors font-sans mb-3"
          >
            <span className="material-icons-outlined text-sm">arrow_back</span>
            All Orders
          </Link>
          <h1 className="font-serif text-2xl text-gray-900 dark:text-white">
            Order <span className="text-primary">{order.orderId || `#${order._id?.slice(-8).toUpperCase()}`}</span>
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-1">{formatDate(order.createdAt)}</p>
        </div>
        <Badge status={order.status} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Left: Timeline ─────────────────────────────────────── */}
        <div className="bg-white dark:bg-surface-dark-2 border border-gray-100 dark:border-border-dark rounded-sm p-6">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-6">
            Order Status
          </p>
          <OrderTimeline status={order.status} updatedAt={order.updatedAt} />
        </div>

        {/* ── Right: Delivery info ───────────────────────────────── */}
        <div className="space-y-4">
          {/* Delivery details */}
          <div className="bg-white dark:bg-surface-dark-2 border border-gray-100 dark:border-border-dark rounded-sm p-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-4">
              Delivery Details
            </p>
            <div className="space-y-2.5">
              {[
                { label: 'Name',    value: order.guestInfo?.name    },
                { label: 'Phone',   value: order.guestInfo?.phone   },
                { label: 'Address', value: order.guestInfo?.address },
                { label: 'City',    value: order.guestInfo?.city    },
                { label: 'Region',  value: order.guestInfo?.region  },
              ].map(({ label, value }) => value && (
                <div key={label} className="flex gap-2">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans w-16 flex-shrink-0 pt-0.5">
                    {label}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 font-sans">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment summary */}
          <div className="bg-white dark:bg-surface-dark-2 border border-gray-100 dark:border-border-dark rounded-sm p-6">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-4">
              Payment
            </p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-sans">Total Paid</p>
              <p className="font-display text-xl text-primary font-semibold">
                {formatPrice(order.total)}
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-400 font-sans">Payment Status</p>
              <Badge status={order.paymentStatus || 'unpaid'} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Items ───────────────────────────────────────────────── */}
      <div className="mt-6 bg-white dark:bg-surface-dark-2 border border-gray-100 dark:border-border-dark rounded-sm p-6">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-4">
          Items Ordered
        </p>
        <OrderItemsList items={order.items} />
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-border-dark flex justify-between">
          <p className="text-sm font-sans font-medium text-gray-900 dark:text-white">Total</p>
          <p className="font-display text-xl text-primary font-semibold">
            {formatPrice(order.total)}
          </p>
        </div>
      </div>

      {/* Gold divider */}
      <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}

export default OrderDetailPage