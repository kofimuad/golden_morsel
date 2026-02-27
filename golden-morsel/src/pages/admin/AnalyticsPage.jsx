import { useState, useEffect } from 'react'
import { getAnalytics } from '../../services/adminService'
import { StatsCard } from '../../components/admin/StatsCard'
import { SalesChart } from '../../components/admin/SalesChart'
import { formatPrice } from '../../utils/formatters'
import { Skeleton } from '../../components/ui/Skeleton'

const PERIODS = [
  { value: '7d',  label: '7 Days'  },
  { value: '30d', label: '30 Days' },
  { value: '90d', label: '90 Days' },
]

export default function AnalyticsPage() {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(true)
  const [period,  setPeriod]  = useState('30d')

  useEffect(() => {
    setLoading(true)
    getAnalytics({ period })
      .then(res => setData(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [period])

  return (
    <div className="space-y-8">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">
            Business Insights
          </p>
          <h2 className="font-display text-xl text-white mt-0.5">Analytics</h2>
        </div>

        {/* Period selector */}
        <div className="flex gap-1 p-1 bg-surface-dark-3 border border-border-dark rounded-sm">
          {PERIODS.map(p => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={[
                'px-4 py-1.5 text-[10px] uppercase tracking-widest font-sans font-medium rounded-sm transition-all',
                period === p.value
                  ? 'bg-primary text-black'
                  : 'text-gray-500 hover:text-white',
              ].join(' ')}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} variant="card" className="h-28" />)}
          </div>
          <Skeleton variant="card" className="h-72" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton variant="card" className="h-64" />
            <Skeleton variant="card" className="h-64" />
          </div>
        </div>
      ) : (
        <>
          {/* ── KPI cards ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Revenue"
              value={data?.totalRevenue ?? 0}
              prefix="currency"
              icon="payments"
              color="gold"
              trend={data?.revenueTrend}
            />
            <StatsCard
              title="Orders"
              value={data?.totalOrders ?? 0}
              icon="receipt_long"
              color="blue"
              trend={data?.ordersTrend}
            />
            <StatsCard
              title="Avg Order Value"
              value={data?.avgOrderValue ?? 0}
              prefix="currency"
              icon="trending_up"
              color="green"
            />
            <StatsCard
              title="Unique Customers"
              value={data?.uniqueCustomers ?? 0}
              icon="people_outline"
              color="purple"
            />
          </div>

          {/* ── Revenue chart ────────────────────────────────────── */}
          {data?.chart?.length > 0 && (
            <SalesChart
              data={data.chart}
              type="line"
              title={`Revenue & Orders — Last ${PERIODS.find(p => p.value === period)?.label}`}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ── Top products ──────────────────────────────────── */}
            <div className="bg-surface-dark-2 border border-border-dark rounded-sm">
              <div className="px-5 py-4 border-b border-border-dark">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
                  Top Products by Revenue
                </p>
              </div>
              <div className="divide-y divide-border-dark">
                {(data?.topProducts || []).length === 0 ? (
                  <p className="px-5 py-8 text-sm text-gray-500 font-sans text-center">No data yet</p>
                ) : (
                  (data?.topProducts || []).map((product, i) => (
                    <div key={i} className="flex items-center gap-4 px-5 py-3.5">
                      {/* Rank */}
                      <span className="text-xs text-gray-600 font-sans font-medium w-5 flex-shrink-0">
                        {i + 1}
                      </span>
                      {/* Image */}
                      <div className="w-9 h-10 rounded-sm overflow-hidden bg-surface-dark-3 flex-shrink-0">
                        {product.image && (
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        )}
                      </div>
                      {/* Name */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-sans truncate">{product.title}</p>
                        <p className="text-[10px] text-gray-500 font-sans">{product.unitsSold} units sold</p>
                      </div>
                      {/* Revenue */}
                      <p className="text-sm text-primary font-sans font-medium flex-shrink-0">
                        {formatPrice(product.revenue)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ── Orders by status ──────────────────────────────── */}
            <div className="bg-surface-dark-2 border border-border-dark rounded-sm">
              <div className="px-5 py-4 border-b border-border-dark">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans">
                  Orders by Status
                </p>
              </div>
              <div className="p-5 space-y-3">
                {(data?.ordersByStatus || []).length === 0 ? (
                  <p className="text-sm text-gray-500 font-sans text-center py-6">No data yet</p>
                ) : (
                  (data?.ordersByStatus || []).map(({ status, count, percentage }) => (
                    <div key={status} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400 font-sans capitalize">{status}</p>
                        <p className="text-xs text-gray-300 font-sans">{count} ({percentage}%)</p>
                      </div>
                      {/* Progress bar */}
                      <div className="h-1.5 w-full bg-surface-dark-3 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/70 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  )
}