import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../hooks/useAdminAuth'
import gmMonogram from '../../assets/logos/gm-monogram-gold.png'
import gmLogoGold from '../../assets/logos/gm-logo-gold.png'

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: 'dashboard',    label: 'Dashboard' },
  { to: '/admin/orders',    icon: 'receipt_long', label: 'Orders'    },
  { to: '/admin/products',  icon: 'inventory_2',  label: 'Products'  },
  { to: '/admin/inventory', icon: 'warehouse',    label: 'Inventory' },
  { to: '/admin/analytics', icon: 'bar_chart',    label: 'Analytics' },
  { to: '/admin/team', icon: 'group', label: 'Team' },
]

// Map route to readable page title
const PAGE_TITLES = {
  '/admin/dashboard': 'Dashboard',
  '/admin/orders':    'Orders',
  '/admin/products':  'Products',
  '/admin/inventory': 'Inventory',
  '/admin/analytics': 'Analytics',
}

export default function AdminTopbar() {
  const { admin, logout } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const pageTitle = PAGE_TITLES[location.pathname] || 'Admin'

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <>
      {/* ── Topbar ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-surface-dark/90 backdrop-blur-md border-b border-border-dark">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">

          {/* Left: mobile menu button + page title */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -ml-2 text-gray-400 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-icons-outlined text-2xl">menu</span>
            </button>

            {/* Page title */}
            <div>
              <h1 className="font-display text-lg text-white leading-none">{pageTitle}</h1>
              <p className="text-[10px] text-gray-500 font-sans uppercase tracking-widest mt-0.5">
                Golden Morsel Admin
              </p>
            </div>
          </div>

          {/* Right: admin info */}
          <div className="flex items-center gap-3">
            {/* Storefront link */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-sans text-gray-500 hover:text-primary transition-colors"
            >
              <span className="material-icons-outlined text-base">open_in_new</span>
              Storefront
            </a>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-border-dark" />

            {/* Admin avatar */}
            {admin && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <span className="text-primary text-xs font-display font-semibold uppercase">
                    {admin.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-white text-xs font-sans font-medium leading-none">{admin.name}</p>
                  <p className="text-gray-500 text-[10px] font-sans uppercase tracking-wide mt-0.5">
                    {admin.role}
                  </p>
                </div>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-400 transition-colors"
              aria-label="Logout"
            >
              <span className="material-icons-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer (lg: hidden — sidebar handles desktop) ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-surface-dark-2 border-r border-border-dark flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-border-dark">
              <img src={gmLogoGold} alt="Golden Morsel" className="h-7 object-contain" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-gray-500 hover:text-primary transition-colors"
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 py-4 px-2 space-y-0.5">
              {NAV_ITEMS.map(({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 px-3 py-3 rounded-sm text-xs font-sans font-medium uppercase tracking-widest transition-all',
                      isActive
                        ? 'bg-primary/15 text-primary border-l-2 border-primary pl-[10px]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent',
                    ].join(' ')
                  }
                >
                  <span className="material-icons-outlined text-xl">{icon}</span>
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Admin info + logout */}
            <div className="border-t border-border-dark p-4">
              {admin && (
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary text-sm font-display font-semibold uppercase">
                      {admin.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-sans font-medium">{admin.name}</p>
                    <p className="text-gray-500 text-[10px] font-sans uppercase tracking-wide">{admin.role}</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-sm text-xs font-sans font-medium uppercase tracking-widest text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <span className="material-icons-outlined text-xl">logout</span>
                Logout
              </button>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          </div>
        </div>
      )}
    </>
  )
}