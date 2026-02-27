import { useState } from 'react'
import { trackByPhone } from '../../services/orderService'
import { OrderCard } from '../../components/order/OrderCard'
import { Skeleton } from '../../components/ui/Skeleton'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'

export function OrderTrackingPage() {
  const [phone,   setPhone]   = useState('')
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!phone.trim()) return

    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      let p = phone.trim()
      if (p.startsWith('0')) p = '+233' + p.slice(1)
      else if (!p.startsWith('+')) p = '+233' + p

      const res = await trackByPhone(p)
      setOrders(res.data.data || [])
    } catch (err) {
      setError('No orders found for this number.')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="text-center mb-10">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-2">
          Order Status
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-gray-900 dark:text-white mb-3">
          Track Your <span className="italic text-primary">Order</span>
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">
          Enter your phone number to view all your orders
        </p>
      </div>

      {/* ── Search form ─────────────────────────────────────────── */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-10">
        <div className="flex-1">
          <Input
            name="phone"
            type="tel"
            prefix="+233"
            placeholder="XX XXX XXXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <Button type="submit" loading={loading} leftIcon="search">
          Track
        </Button>
      </form>

      {/* ── Results ─────────────────────────────────────────────── */}
      {loading && (
        <div className="space-y-4">
          {[1, 2].map(i => <Skeleton key={i} variant="card" className="h-36" />)}
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-12">
          <span className="material-icons-outlined text-4xl text-gray-300 dark:text-gray-700 mb-3 block">
            search_off
          </span>
          <p className="text-sm font-sans text-gray-400">{error}</p>
          <p className="text-xs text-gray-400 font-sans mt-1 uppercase tracking-widest">
            Double-check the number you used at checkout
          </p>
        </div>
      )}

      {!loading && searched && orders.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 font-sans uppercase tracking-widest mb-4">
            {orders.length} order{orders.length !== 1 ? 's' : ''} found
          </p>
          <div className="space-y-3">
            {orders.map(order => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        </div>
      )}

      {/* Gold divider */}
      <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}

export default OrderTrackingPage