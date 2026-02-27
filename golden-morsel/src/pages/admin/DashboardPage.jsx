import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDashboard } from '../../services/adminService'
import { StatsCard } from '../../components/admin/StatsCard'
import { SalesChart } from '../../components/admin/SalesChart'
import Badge from '../../components/ui/Badge'
import { Skeleton } from '../../components/ui/Skeleton'
import { formatPrice, formatDate } from '../../utils/formatters'

export default function DashboardPage() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    getDashboard()
      .then(res => setData(res.data.data))
      .catch(() => setError('Failed to load dashboard'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} variant="card" className="h-28" />)}
        </div>
        <Skeleton variant="card" className="h-72" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-sm bg-red-500/10 border border-red-500/20 text-red-400">
        <span className="material-icons-outlined">error_outline</span>
        <p className="text-sm font-sans">{error}</p>
      </div>
    )
  }

  const stats  = {
  totalRevenue:  data?.revenue      ?? 0,
  totalOrders:   data?.orders?.total   ?? 0,
  pendingOrders: data?.orders?.pending ?? 0,
  }
  const chart   = data?.chart        || []
  const recent  = data?.recentOrders || []
  const alerts  = data?.lowStockAlerts || []

  return (
    <div className="space-y-8">

      {/* ── Stats cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={stats.totalRevenue ?? 0}
          prefix="currency"
          icon="payments"
          color="gold"
          trend={stats.revenueTrend}
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders ?? 0}
          icon="receipt_long"
          color="blue"
          trend={stats.ordersTrend}
        />
        <StatsCard
          title="Pending Orders"
          value={stats.pendingOrders ?? 0}
          icon="hourglass_empty"
          color="purple"
        />
        <StatsCard
          title="Low Stock Items"
          value={alerts.length}
          icon="inventory_2"
          color={alerts.length > 0 ? 'gold' : 'green'}
        />
      </div>

      {/* ── Sales chart ─────────────────────────────────────────── */}
      {chart.length > 0 && (
        <SalesChart data={chart} type="line" title="Revenue & Orders — Last 30 Days" />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* ── Recent orders ───────────────────────────────────────── */}
        <div className="bg-surface-dark-2 border border-border-dark rounded-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-dark">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
              Recent Orders
            </p>
            <Link
              to="/admin/orders"
              className="text-[10px] uppercase tracking-widest text-primary hover:text-primary-light transition-colors font-sans"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-border-dark">
            {recent.length === 0 ? (
              <p className="px-5 py-8 text-sm text-gray-500 font-sans text-center">
                No orders yet
              </p>
            ) : (
              recent.slice(0, 6).map(order => (
                <Link
                  key={order._id}
                  to={`/admin/orders`}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {/* Avatar initials */}
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary text-xs font-display font-semibold uppercase">
                        {order.guestInfo?.name?.charAt(0) || '?'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-white font-sans font-medium leading-none group-hover:text-primary transition-colors">
                        {order.guestInfo?.name || 'Guest'}
                      </p>
                      <p className="text-[10px] text-gray-500 font-sans mt-0.5">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-primary font-sans font-medium">
                      {formatPrice(order.total)}
                    </p>
                    <Badge status={order.status} />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* ── Low stock alerts ────────────────────────────────────── */}
        <div className="bg-surface-dark-2 border border-border-dark rounded-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-dark">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
              Low Stock Alerts
            </p>
            <Link
              to="/admin/inventory"
              className="text-[10px] uppercase tracking-widest text-primary hover:text-primary-light transition-colors font-sans"
            >
              Manage
            </Link>
          </div>

          <div className="divide-y divide-border-dark">
            {alerts.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <span className="material-icons-outlined text-3xl text-green-400 mb-2 block">
                  check_circle
                </span>
                <p className="text-sm text-gray-500 font-sans">All stock levels are healthy</p>
              </div>
            ) : (
              alerts.slice(0, 6).map(item => (
                <div
                  key={item._id}
                  className="flex items-center justify-between px-5 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    {/* Product image */}
                    <div className="w-9 h-10 rounded-sm overflow-hidden bg-surface-dark-3 flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-surface-dark-3" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-white font-sans font-medium leading-none truncate max-w-[160px]">
                        {item.title}
                      </p>
                      {item.variant && (
                        <p className="text-[10px] text-gray-500 font-sans mt-0.5 uppercase tracking-wide">
                          {item.variant}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className={[
                      'text-sm font-sans font-medium',
                      item.stock === 0 ? 'text-red-400' : 'text-amber-400',
                    ].join(' ')}>
                      {item.stock} left
                    </p>
                    <Badge status={item.stock === 0 ? 'out' : 'low'} dot={false} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}