import { useState, useEffect, useCallback } from 'react'
import { getAllOrders, confirmPayment } from '../../services/adminService'
import { updateOrderStatus } from '../../services/orderService'
import { showToast } from '../../components/ui/Toast'
import { formatPrice, formatDate } from '../../utils/formatters'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { Skeleton } from '../../components/ui/Skeleton'

const STATUS_OPTIONS = [
  { value: '',            label: 'All Statuses'  },
  { value: 'pending',     label: 'Pending'       },
  { value: 'confirmed',   label: 'Confirmed'     },
  { value: 'processing',  label: 'Processing'    },
  { value: 'shipped',     label: 'Shipped'       },
  { value: 'delivered',   label: 'Delivered'     },
  { value: 'cancelled',   label: 'Cancelled'     },
]

const ORDER_STATUSES = ['pending','confirmed','processing','shipped','delivered','cancelled']

export default function OrdersPage() {
  const [orders,   setOrders]   = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('')
  const [search,   setSearch]   = useState('')
  const [page,     setPage]     = useState(1)
  const [total,    setTotal]    = useState(0)
  const [pages,    setPages]    = useState(1)

  // Confirm payment modal state
  const [confirmModal, setConfirmModal] = useState({ open: false, order: null })
  const [confirmLoading, setConfirmLoading] = useState(false)

  // Status update inline
  const [updatingId, setUpdatingId] = useState(null)

  // ── Fetch orders ─────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const params = { page, limit: 15 }
      if (filter) params.status = filter
      if (search) params.search = search
      const res = await getAllOrders(params)
      setOrders(res.data.data)
      setTotal(res.data.total)
      setPages(res.data.pages)
    } catch {
      showToast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }, [page, filter, search])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  // Reset page on filter/search change
  useEffect(() => { setPage(1) }, [filter, search])

  // ── Confirm payment ──────────────────────────────────────────
  const handleConfirmPayment = async () => {
    if (!confirmModal.order) return
    setConfirmLoading(true)
    try {
      await confirmPayment(confirmModal.order._id, { status: 'confirmed' })
      showToast.success('Payment confirmed successfully')
      setConfirmModal({ open: false, order: null })
      fetchOrders()
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Failed to confirm payment')
    } finally {
      setConfirmLoading(false)
    }
  }

  // ── Update order status inline ───────────────────────────────
  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, { status: newStatus })
      showToast.success(`Order updated to ${newStatus}`)
      fetchOrders()
    } catch {
      showToast.error('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">
            {total} total orders
          </p>
          <h2 className="font-display text-xl text-white mt-0.5">Orders</h2>
        </div>
      </div>

      {/* ── Filters ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-dark-3 border border-border-dark rounded-sm pl-10 pr-4 py-2.5 text-sm text-white font-sans placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="appearance-none bg-surface-dark-3 border border-border-dark rounded-sm pl-4 pr-10 py-2.5 text-sm text-white font-sans focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all"
          >
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <span className="material-icons-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
            expand_more
          </span>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────── */}
      <div className="bg-surface-dark-2 border border-border-dark rounded-sm overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[2fr_1.2fr_1fr_1.2fr_1.5fr_auto] gap-4 px-5 py-3 border-b border-border-dark">
          {['Customer', 'Date', 'Items', 'Total', 'Status', 'Actions'].map(h => (
            <p key={h} className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">{h}</p>
          ))}
        </div>

        {/* Rows */}
        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} variant="text" lines={1} className="h-12" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center">
            <span className="material-icons-outlined text-4xl text-gray-700 mb-3 block">receipt_long</span>
            <p className="text-sm text-gray-500 font-sans">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-border-dark">
            {orders.map(order => (
              <div
                key={order._id}
                className="grid grid-cols-1 md:grid-cols-[2fr_1.2fr_1fr_1.2fr_1.5fr_auto] gap-3 md:gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
              >
                {/* Customer */}
                <div>
                  <p className="text-sm text-white font-sans font-medium">
                    {order.guestInfo?.name || 'Guest'}
                  </p>
                  <p className="text-xs text-gray-500 font-sans">{order.guestInfo?.phone}</p>
                  <p className="text-[10px] text-gray-600 font-sans">#{order._id?.slice(-8).toUpperCase()}</p>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-400 font-sans self-center">
                  {formatDate(order.createdAt)}
                </p>

                {/* Items count */}
                <p className="text-xs text-gray-400 font-sans self-center">
                  {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                </p>

                {/* Total */}
                <p className="text-sm text-primary font-sans font-medium self-center">
                  {formatPrice(order.total)}
                </p>

                {/* Status dropdown */}
                <div className="self-center">
                  <div className="relative inline-block">
                    <select
                      value={order.status}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                      className="appearance-none bg-surface-dark-3 border border-border-dark rounded-sm pl-3 pr-8 py-1.5 text-xs text-white font-sans focus:outline-none focus:ring-1 focus:ring-primary/50 cursor-pointer disabled:opacity-50"
                    >
                      {ORDER_STATUSES.map(s => (
                        <option key={s} value={s} className="capitalize">{s}</option>
                      ))}
                    </select>
                    <span className="material-icons-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="self-center flex items-center gap-2">
                  {/* Confirm payment — only show for pending */}
                  {order.status === 'pending' && (
                    <button
                      onClick={() => setConfirmModal({ open: true, order })}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-sm bg-primary/15 border border-primary/30 text-primary text-[10px] uppercase tracking-widest font-sans hover:bg-primary/25 transition-colors whitespace-nowrap"
                    >
                      <span className="material-icons-outlined text-sm">verified</span>
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Pagination ──────────────────────────────────────────── */}
      {pages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 font-sans">
            Page {page} of {pages} · {total} orders
          </p>
          <div className="flex gap-2">
            <Button
              variant="dark"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              leftIcon="chevron_left"
            >
              Prev
            </Button>
            <Button
              variant="dark"
              size="sm"
              disabled={page === pages}
              onClick={() => setPage(p => p + 1)}
              rightIcon="chevron_right"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* ── Confirm Payment Modal ────────────────────────────────── */}
      <Modal
        open={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, order: null })}
        title="Confirm Payment"
        description="This will mark the order as paid and notify the customer."
        size="sm"
        footer={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmModal({ open: false, order: null })}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              loading={confirmLoading}
              onClick={handleConfirmPayment}
              leftIcon="verified"
            >
              Confirm Payment
            </Button>
          </>
        }
      >
        {confirmModal.order && (
          <div className="space-y-3">
            <div className="p-4 rounded-sm bg-surface-dark-3 border border-border-dark space-y-2">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-gray-400">Customer</span>
                <span className="text-white">{confirmModal.order.guestInfo?.name}</span>
              </div>
              <div className="flex justify-between text-xs font-sans">
                <span className="text-gray-400">Phone</span>
                <span className="text-white">{confirmModal.order.guestInfo?.phone}</span>
              </div>
              <div className="flex justify-between text-xs font-sans">
                <span className="text-gray-400">Order Total</span>
                <span className="text-primary font-medium">{formatPrice(confirmModal.order.total)}</span>
              </div>
              <div className="flex justify-between text-xs font-sans">
                <span className="text-gray-400">Order ID</span>
                <span className="text-white">#{confirmModal.order._id?.slice(-8).toUpperCase()}</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-sans">
              Once confirmed, the order status will change to <span className="text-green-400">Confirmed</span> and the customer will be notified via WhatsApp.
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}