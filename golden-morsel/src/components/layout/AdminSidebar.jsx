import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import gmLogoGold from '../../assets/logos/gm-logo-gold.png'
import gmMonogram from '../../assets/logos/gm-monogram-gold.png'

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: 'dashboard',     label: 'Dashboard'  },
  { to: '/admin/orders',    icon: 'receipt_long',  label: 'Orders'     },
  { to: '/admin/products',  icon: 'inventory_2',   label: 'Products'   },
  { to: '/admin/inventory', icon: 'warehouse',     label: 'Inventory'  },
  { to: '/admin/analytics', icon: 'bar_chart',     label: 'Analytics'  },
  { to: '/admin/team', icon: 'group', label: 'Team' },
]

export default function AdminSidebar() {
  const { admin, logout } = useAdminAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <>
      {/* ── Desktop Sidebar ─────────────────────────────────────── */}
      <aside
        className={[
          'hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40',
          'bg-surface-dark-2 border-r border-border-dark',
          'transition-all duration-300',
          collapsed ? 'w-16' : 'w-60',
        ].join(' ')}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-border-dark min-h-[65px]">
          {!collapsed && (
            <img
              src={gmLogoGold}
              alt="Golden Morsel Admin"
              className="h-7 object-contain"
            />
          )}
          {collapsed && (
            <img
              src={gmMonogram}
              alt="GM"
              className="h-7 w-7 object-contain mx-auto"
            />
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1 text-gray-500 hover:text-primary transition-colors ${collapsed ? 'mx-auto' : ''}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <span className="material-icons-outlined text-xl">
              {collapsed ? 'chevron_right' : 'chevron_left'}
            </span>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs font-sans font-medium uppercase tracking-widest transition-all duration-150 group',
                  collapsed ? 'justify-center' : '',
                  isActive
                    ? 'bg-primary/15 text-primary border-l-2 border-primary pl-[10px]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent',
                ].join(' ')
              }
            >
              <span className="material-icons-outlined text-xl flex-shrink-0">{icon}</span>
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Admin info + logout */}
        <div className="border-t border-border-dark p-3">
          {!collapsed && admin && (
            <div className="flex items-center gap-3 px-2 py-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xs font-display font-semibold uppercase">
                  {admin.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-xs font-sans font-medium truncate">{admin.name}</p>
                <p className="text-gray-500 text-[10px] font-sans uppercase tracking-wide truncate">
                  {admin.role}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            className={[
              'flex items-center gap-3 w-full px-3 py-2.5 rounded-sm',
              'text-xs font-sans font-medium uppercase tracking-widest',
              'text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors',
              collapsed ? 'justify-center' : '',
            ].join(' ')}
          >
            <span className="material-icons-outlined text-xl flex-shrink-0">logout</span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Gold accent bottom */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </aside>
    </>
  )
}