import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrderByOrderId } from '../../services/orderService'
import { formatPrice, formatDate } from '../../utils/formatters'
import { OrderItemsList } from '../../components/order/OrderItemsList'
import Button from '../../components/ui/Button'
import { Skeleton } from '../../components/ui/Skeleton'

export default function OrderConfirmPage() {
  const { orderId } = useParams()
  console.log('orderId from params:', orderId)
  console.log('current URL:', window.location.pathname)
  const [order,   setOrder]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrderByOrderId(orderId)
      .then(res => setOrder(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [orderId])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 space-y-4">
        <Skeleton variant="text" lines={2} />
        <Skeleton variant="card" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

      {/* ── Success header ──────────────────────────────────────── */}
      <div className="text-center mb-12">
        {/* Animated checkmark */}
        <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6">
          <span className="material-icons-outlined text-4xl text-primary">check_circle</span>
        </div>

        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
          Order Placed Successfully
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">
          Thank you{order?.guestInfo?.name ? `, ${order.guestInfo.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-sans leading-relaxed max-w-md mx-auto">
          Your order has been received. We've sent payment instructions to your WhatsApp —
          please complete payment to confirm your order.
        </p>
      </div>

      {/* ── WhatsApp reminder ───────────────────────────────────── */}
      <div className="flex items-start gap-3 p-4 mb-8 rounded-sm bg-green-500/5 border border-green-500/20">
        <span className="material-icons-outlined text-green-400 text-xl flex-shrink-0 mt-0.5">
          whatsapp
        </span>
        <div>
          <p className="text-xs font-sans font-medium text-green-400 uppercase tracking-widest mb-1">
            Check Your WhatsApp
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
            Payment instructions have been sent to{' '}
            <span className="text-white font-medium">
              {order?.guestInfo?.phone || 'your phone'}
            </span>
            . Complete payment to confirm your order.
          </p>
        </div>
      </div>

      {/* ── Order details card ──────────────────────────────────── */}
      {order && (
        <div className="bg-white dark:bg-surface-dark-2 border border-gray-100 dark:border-border-dark rounded-sm p-6 mb-8 space-y-6">

          {/* Order meta */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1">
                Order ID
              </p>
              <p>{order.orderId || `#${order._id?.slice(-8).toUpperCase()}`}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1">
                Date
              </p>
              <p className="text-sm font-sans text-gray-600 dark:text-gray-300">
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1">
                Deliver To
              </p>
              <p className="text-sm font-sans text-gray-600 dark:text-gray-300">
                {order.guestInfo?.city}, {order.guestInfo?.region}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1">
                Total
              </p>
              <p className="text-sm font-medium text-primary font-sans">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100 dark:bg-border-dark" />

          {/* Items */}
          <OrderItemsList items={order.items} />
        </div>
      )}

      {/* ── Actions ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/track" className="flex-1">
          <Button variant="secondary" fullWidth leftIcon="local_shipping">
            Track Order
          </Button>
        </Link>
        <Link to="/products" className="flex-1">
          <Button variant="ghost" fullWidth>
            Continue Shopping
          </Button>
        </Link>
      </div>

      {/* Gold divider */}
      <div className="mt-12 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}