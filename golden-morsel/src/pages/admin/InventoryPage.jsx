import { useState, useEffect, useCallback } from 'react'
import {
  getStockLevels, getInventoryLogs,
  restockProduct, adjustInventory,
} from '../../services/inventoryService'
import { showToast } from '../../components/ui/Toast'
import { formatDate, formatPrice } from '../../utils/formatters'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Select from '../../components/ui/Select'
import Input from '../../components/ui/Input'
import { Skeleton } from '../../components/ui/Skeleton'

const TABS = [
  { key: 'stock', label: 'Stock Levels',   icon: 'inventory_2'   },
  { key: 'logs',  label: 'Activity Log',   icon: 'history'       },
]

export default function InventoryPage() {
  const [tab,      setTab]      = useState('stock')
  const [stock,    setStock]    = useState([])
  const [logs,     setLogs]     = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')

  // Restock modal
  const [restockModal,  setRestockModal]  = useState({ open: false, item: null })
  const [restockQty,    setRestockQty]    = useState('')
  const [restockNote,   setRestockNote]   = useState('')
  const [restockLoading, setRestockLoading] = useState(false)

  // Adjust modal
  const [adjustModal,   setAdjustModal]   = useState({ open: false, item: null })
  const [adjustQty,     setAdjustQty]     = useState('')
  const [adjustReason, setAdjustReason] = useState('manual_adjustment')
  const [adjustLoading, setAdjustLoading] = useState(false)

  // ── Fetch stock ──────────────────────────────────────────────
  const fetchStock = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getStockLevels()
      console.log('Stock response:', res.data) // remove after fix
      setStock(res.data.data.allProducts || [])
    } catch {
      showToast.error('Failed to load stock')
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Fetch logs ───────────────────────────────────────────────
  const fetchLogs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getInventoryLogs()
      setLogs(res.data.data || [])
    } catch {
      showToast.error('Failed to load logs')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (tab === 'stock') fetchStock()
    else fetchLogs()
  }, [tab, fetchStock, fetchLogs])

  // ── Filtered stock ───────────────────────────────────────────
  const filteredStock = stock.filter(item =>
  item && item.title?.toLowerCase().includes(search.toLowerCase())
  )

  // ── Restock ──────────────────────────────────────────────────
  const handleRestock = async () => {
    if (!restockQty || isNaN(restockQty) || parseInt(restockQty) <= 0) {
      showToast.error('Enter a valid quantity')
      return
    }
    setRestockLoading(true)
    try {
      await restockProduct({
        productId: restockModal.item._id,
        quantity:  parseInt(restockQty),
        note:      restockNote || undefined,
      })
      showToast.success(`Restocked ${restockModal.item.title}`)
      setRestockModal({ open: false, item: null })
      setRestockQty('')
      setRestockNote('')
      fetchStock()
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Restock failed')
    } finally {
      setRestockLoading(false)
    }
  }

  // ── Adjust inventory ─────────────────────────────────────────
  const handleAdjust = async () => {
    if (!adjustQty || isNaN(adjustQty) || parseInt(adjustQty) <= 0) {
      showToast.error('Enter a valid quantity to remove')
      return
    }
    if (parseInt(adjustQty) > adjustModal.item.stock) {
      showToast.error(`Cannot remove more than current stock (${adjustModal.item.stock})`)
      return
    }
    if (!adjustReason) {
      showToast.error('Please select a reason')
      return
    }
    setAdjustLoading(true)
    try {
      await adjustInventory({
        productId:   adjustModal.item._id,
        newQuantity: adjustModal.item.stock - parseInt(adjustQty), // always subtract
        reason:      adjustReason,
      })
      showToast.success('Stock reduced successfully')
      setAdjustModal({ open: false, item: null })
      setAdjustQty('')
      setAdjustReason('manual_adjustment')
      fetchStock()
    } catch (err) {
      showToast.error(err.response?.data?.message || 'Adjustment failed')
    } finally {
      setAdjustLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">
          Stock Management
        </p>
        <h2 className="font-display text-xl text-white mt-0.5">Inventory</h2>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────── */}
      <div className="flex gap-1 border-b border-border-dark">
        {TABS.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={[
              'flex items-center gap-2 px-5 py-3 text-xs font-sans font-medium uppercase tracking-widest transition-all border-b-2 -mb-px',
              tab === key
                ? 'text-primary border-primary'
                : 'text-gray-500 border-transparent hover:text-gray-300',
            ].join(' ')}
          >
            <span className="material-icons-outlined text-base">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* ── Stock tab ───────────────────────────────────────────── */}
      {tab === 'stock' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative max-w-sm">
            <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-surface-dark-3 border border-border-dark rounded-sm pl-10 pr-4 py-2.5 text-sm text-white font-sans placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>

          {/* Stock table */}
          <div className="bg-surface-dark-2 border border-border-dark rounded-sm overflow-hidden">
            {/* Header */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-border-dark">
              {['Product', 'Category', 'Stock', 'Status', 'Actions'].map(h => (
                <p key={h} className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">{h}</p>
              ))}
            </div>

            {loading ? (
              <div className="p-4 space-y-3">
                {[...Array(6)].map((_, i) => <Skeleton key={i} variant="text" lines={1} className="h-14" />)}
              </div>
            ) : filteredStock.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-sm text-gray-500 font-sans">No products found</p>
              </div>
            ) : (
              <div className="divide-y divide-border-dark">
                {filteredStock.map(item => {
                  const stockStatus = item.stock === 0 ? 'out'
                    : item.stock <= item.lowStockThreshold ? 'low'
                    : 'ok'

                  return (
                    <div
                      key={item._id}
                      className={[
                        'grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 md:gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors',
                        stockStatus === 'out' ? 'border-l-2 border-red-500/50' : '',
                        stockStatus === 'low' ? 'border-l-2 border-amber-500/50' : '',
                      ].join(' ')}
                    >
                      {/* Product */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-12 rounded-sm overflow-hidden bg-surface-dark-3 flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-surface-dark-3" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-white font-sans font-medium leading-snug">
                            {item.title}
                          </p>
                          <p className="text-xs text-primary font-sans">{formatPrice(item.price)}</p>
                        </div>
                      </div>

                      {/* Category */}
                      <p className="text-xs text-gray-400 font-sans self-center capitalize">
                        {item.category}
                      </p>

                      {/* Stock count */}
                      <p className={[
                        'text-sm font-sans font-medium self-center',
                        stockStatus === 'out' ? 'text-red-400' :
                        stockStatus === 'low' ? 'text-amber-400' : 'text-green-400',
                      ].join(' ')}>
                        {item.stock}
                      </p>

                      {/* Status */}
                      <div className="self-center">
                        <Badge status={stockStatus} />
                      </div>

                      {/* Actions */}
                      <div className="self-center flex items-center gap-2">
                        <button
                          onClick={() => {
                            setRestockModal({ open: true, item })
                            setRestockQty('')
                            setRestockNote('')
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans text-green-400 bg-green-500/10 border border-green-500/20 rounded-sm hover:bg-green-500/20 transition-colors"
                        >
                          <span className="material-icons-outlined text-sm">add</span>
                          Restock
                        </button>
                        <button
                          onClick={() => {
                            setAdjustModal({ open: true, item })
                            setAdjustQty('')
                            setAdjustReason('manual_adjustment')
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 text-[10px] uppercase tracking-widest font-sans text-red-400 bg-red-500/10 border border-red-500/20 rounded-sm hover:bg-red-500/20 transition-colors"
                        >
                          <span className="material-icons-outlined text-sm">remove</span>
                          Reduce
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Logs tab ────────────────────────────────────────────── */}
      {tab === 'logs' && (
        <div className="bg-surface-dark-2 border border-border-dark rounded-sm overflow-hidden">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-4 px-5 py-3 border-b border-border-dark">
            {['Product', 'Type', 'Change', 'New Stock', 'Date'].map(h => (
              <p key={h} className="text-[10px] uppercase tracking-widest text-gray-500 font-sans">{h}</p>
            ))}
          </div>

          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(8)].map((_, i) => <Skeleton key={i} variant="text" lines={1} className="h-12" />)}
            </div>
          ) : logs.length === 0 ? (
            <div className="py-16 text-center">
              <span className="material-icons-outlined text-4xl text-gray-700 mb-3 block">history</span>
              <p className="text-sm text-gray-500 font-sans">No inventory activity yet</p>
            </div>
          ) : (
            <div className="divide-y divide-border-dark">
              {logs.map((log, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1.5fr] gap-3 md:gap-4 px-5 py-3.5 hover:bg-white/[0.02] transition-colors">
                  <p className="text-sm text-white font-sans font-medium">{log.productTitle || '—'}</p>
                  <span className={[
                    'text-[10px] uppercase tracking-widest font-sans font-medium self-center',
                    log.type === 'restock'  ? 'text-green-400' :
                    log.type === 'sale'     ? 'text-blue-400'  :
                    log.type === 'adjust'   ? 'text-amber-400' : 'text-gray-400',
                  ].join(' ')}>
                    {log.type}
                  </span>
                  <p className={[
                    'text-sm font-sans font-medium self-center',
                    log.change > 0 ? 'text-green-400' : 'text-red-400',
                  ].join(' ')}>
                    {log.change > 0 ? `+${log.change}` : log.change}
                  </p>
                  <p className="text-sm text-gray-300 font-sans self-center">{log.newStock}</p>
                  <p className="text-xs text-gray-500 font-sans self-center">{formatDate(log.createdAt)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Restock Modal ────────────────────────────────────────── */}
      <Modal
        open={restockModal.open}
        onClose={() => setRestockModal({ open: false, item: null })}
        title="Restock Product"
        description={restockModal.item?.title}
        size="sm"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setRestockModal({ open: false, item: null })}>
              Cancel
            </Button>
            <Button size="sm" loading={restockLoading} onClick={handleRestock} leftIcon="add">
              Add Stock
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {restockModal.item && (
            <div className="flex items-center gap-3 p-3 rounded-sm bg-surface-dark-3 border border-border-dark">
              <div className="w-10 h-12 rounded-sm overflow-hidden flex-shrink-0">
                {restockModal.item.image && (
                  <img src={restockModal.item.image} alt={restockModal.item.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <p className="text-sm text-white font-sans">{restockModal.item.title}</p>
                <p className="text-xs text-gray-400 font-sans">Current stock: <span className="text-amber-400">{restockModal.item.stock}</span></p>
              </div>
            </div>
          )}
          <Input
            label="Quantity to Add"
            type="number"
            min="1"
            value={restockQty}
            onChange={e => setRestockQty(e.target.value)}
            placeholder="e.g. 50"
            hint="This will be added to the current stock"
          />
          <Input
            label="Note (Optional)"
            value={restockNote}
            onChange={e => setRestockNote(e.target.value)}
            placeholder="e.g. New shipment received"
          />
        </div>
      </Modal>

      {/* ── Adjust Modal ─────────────────────────────────────────── */}
      <Modal
        open={adjustModal.open}
        onClose={() => setAdjustModal({ open: false, item: null })}
        title="Reduce Stock"
        description="Remove units due to damage, returns, or corrections"
        size="sm"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setAdjustModal({ open: false, item: null })}>
              Cancel
            </Button>
            <Button size="sm" loading={adjustLoading} onClick={handleAdjust} leftIcon="tune">
              Apply Adjustment
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          {adjustModal.item && (
            <div className="p-3 rounded-sm bg-surface-dark-3 border border-border-dark">
              <p className="text-sm text-white font-sans">{adjustModal.item.title}</p>
              <p className="text-xs text-gray-400 font-sans mt-0.5">
                Current stock: <span className="text-white">{adjustModal.item.stock}</span>
              </p>
            </div>
          )}
          <Input
            label="Quantity to Remove"
            type="number"
            min="1"
            value={adjustQty}
            onChange={e => setAdjustQty(e.target.value)}
            placeholder={`Max: ${adjustModal.item?.stock}`}
            hint="Enter how many units to remove from current stock"
          />
          <Select
            label="Reason"
            value={adjustReason}
            onChange={e => setAdjustReason(e.target.value)}
            options={[
              { value: 'manual_adjustment', label: 'Manual Adjustment' },
              { value: 'damage',            label: 'Damaged Goods'     },
              { value: 'return',            label: 'Customer Return'   },
              { value: 'restock',           label: 'Restock'           },
            ]}
          />
        </div>
      </Modal>
    </div>
  )
}