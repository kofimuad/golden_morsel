import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { trackByPhone } from '../../services/orderService'
import { showToast } from '../../components/ui/Toast'
import { formatDate, formatPrice } from '../../utils/formatters'
import { OrderCard } from '../../components/order/OrderCard'
import { Skeleton } from '../../components/ui/Skeleton'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const TABS = [
  { key: 'orders',  label: 'My Orders',  icon: 'receipt_long'  },
  { key: 'profile', label: 'Profile',    icon: 'person_outline' },
]

export default function AccountPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [tab,     setTab]     = useState('orders')
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)

  // ── Fetch orders by phone ────────────────────────────────────
  useEffect(() => {
    if (!user?.phone) return
    setLoading(true)
    trackByPhone(user.phone)
      .then(res => setOrders(res.data.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [user?.phone])

  const handleLogout = () => {
    logout()
    showToast.success('Signed out successfully')
    navigate('/')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">

      {/* ── Profile header ──────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
            <span className="font-display text-2xl text-primary font-semibold uppercase">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div>
            <h1 className="font-serif text-2xl text-gray-900 dark:text-white leading-tight">
              {user?.name}
            </h1>
            <p className="text-xs text-gray-400 font-sans mt-0.5">{user?.phone}</p>
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="ghost"
          size="sm"
          leftIcon="logout"
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-400"
        >
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────── */}
      <div className="flex gap-1 border-b border-gray-200 dark:border-border-dark mb-8">
        {TABS.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={[
              'flex items-center gap-2 px-5 py-3 text-xs font-sans font-medium uppercase tracking-widest transition-all border-b-2 -mb-px',
              tab === key
                ? 'text-primary border-primary'
                : 'text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200',
            ].join(' ')}
          >
            <span className="material-icons-outlined text-base">{icon}</span>
            {label}
          </button>
        ))}
      </div>

      {/* ── Orders tab ──────────────────────────────────────────── */}
      {tab === 'orders' && (
        <div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} variant="card" className="h-36" />
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-20">
              <span className="material-icons-outlined text-5xl text-gray-200 dark:text-gray-700 mb-4 block">
                receipt_long
              </span>
              <p className="font-serif text-xl text-gray-400 dark:text-gray-600 mb-2">
                No orders yet
              </p>
              <p className="text-xs text-gray-400 font-sans uppercase tracking-widest mb-6">
                Your order history will appear here
              </p>
              <Button
                variant="secondary"
                onClick={() => navigate('/products')}
                leftIcon="shopping_bag"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-xs text-gray-400 font-sans uppercase tracking-widest mb-4">
                {orders.length} order{orders.length !== 1 ? 's' : ''}
              </p>
              <div className="space-y-3">
                {orders.map(order => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Profile tab ─────────────────────────────────────────── */}
      {tab === 'profile' && (
        <ProfileTab user={user} />
      )}
    </div>
  )
}

// ── Profile sub-component ────────────────────────────────────
function ProfileTab({ user }) {
  const [editing, setEditing] = useState(false)
  const [form,    setForm]    = useState({
    name:  user?.name  || '',
    email: user?.email || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // NOTE: Wire to a PATCH /auth/me endpoint when available
  const handleSave = () => {
    showToast.info('Profile update coming soon')
    setEditing(false)
  }

  return (
    <div className="max-w-md space-y-6">
      <div className="bg-white dark:bg-surface-dark-2 border border-gray-100 dark:border-border-dark rounded-sm p-6 space-y-5">

        {/* Name */}
        {editing ? (
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        ) : (
          <InfoRow label="Full Name" value={user?.name} />
        )}

        {/* Phone — not editable */}
        <InfoRow
          label="Phone Number"
          value={user?.phone}
          hint="Used for WhatsApp order updates"
        />

        {/* Email */}
        {editing ? (
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
        ) : (
          <InfoRow label="Email" value={user?.email || '—'} />
        )}

        {/* Member since */}
        <InfoRow
          label="Member Since"
          value={user?.createdAt ? formatDate(user.createdAt) : '—'}
        />
      </div>

      {/* Edit / Save buttons */}
      <div className="flex gap-3">
        {editing ? (
          <>
            <Button onClick={handleSave} leftIcon="save">
              Save Changes
            </Button>
            <Button variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="secondary"
            leftIcon="edit"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>
    </div>
  )
}

function InfoRow({ label, value, hint }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-sans mb-1">
        {label}
      </p>
      <p className="text-sm text-gray-900 dark:text-white font-sans">{value}</p>
      {hint && (
        <p className="text-[10px] text-gray-400 font-sans mt-0.5">{hint}</p>
      )}
    </div>
  )
}