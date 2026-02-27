import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import gmLogoGold from '../../assets/logos/gm-logo-gold.png'
import gmLogoBlack from '../../assets/logos/gm-logo-black.png'
import CartDrawer from '../cart/CartDrawer'

const NAV_LINKS = [
  { to: '/',         label: 'Home'     },
  { to: '/products', label: 'Shop'     },
  { to: '/memoria',  label: 'Memoria'  },
  { to: '/track',    label: 'Track'    },
]

export default function Header() {
  const { itemCount } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <>
      {/* ── Top Header ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Mobile: Hamburger */}
            <button
              className="md:hidden p-2 -ml-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-icons-outlined text-2xl">menu</span>
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 relative">
              {/* Dark glow — only visible in light mode */}
              <div
                className="absolute -inset-x-4 -inset-y-2 rounded-sm dark:hidden"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, transparent 60%)',
                }}
              />
              {/* Light mode: gold logo over dark glow */}
              <img
                src={gmLogoBlack}
                alt="Golden Morsel"
                className="h-8 object-contain block dark:hidden relative"
              />
              {/* Dark mode: gold logo, navbar already dark */}
              <img
                src={gmLogoGold}
                alt="Golden Morsel"
                className="h-8 object-contain hidden dark:block relative"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    [
                      'text-xs uppercase tracking-widest font-sans font-medium transition-colors duration-200 pb-0.5',
                      isActive
                        ? 'text-primary border-b border-primary'
                        : 'text-gray-600 dark:text-gray-400 hover:text-primary border-b border-transparent',
                    ].join(' ')
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Account — desktop only */}
              <div className="hidden md:block">
                {isAuthenticated ? (
                  <div className="flex items-center gap-1">
                    <Link
                      to="/account"
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                      aria-label="Account"
                    >
                      <span className="material-icons-outlined text-2xl">person_outline</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-400 transition-colors"
                      aria-label="Logout"
                    >
                      <span className="material-icons-outlined text-2xl">logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="text-xs uppercase tracking-widest font-sans font-medium text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>

              {/* Cart button */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                aria-label={`Cart (${itemCount} items)`}
              >
                <span className="material-icons-outlined text-2xl">shopping_bag</span>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Menu ──────────────────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-background-light dark:bg-surface-dark-2 flex flex-col shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-border-dark">
              <img
                src={gmLogoGold}
                alt="Golden Morsel"
                className="h-7 object-contain"
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1 text-gray-500 hover:text-primary transition-colors"
              >
                <span className="material-icons-outlined">close</span>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
              {NAV_LINKS.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 px-3 py-3 rounded-sm text-sm font-sans font-medium uppercase tracking-widest transition-colors',
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5',
                    ].join(' ')
                  }
                >
                  {label}
                </NavLink>
              ))}

              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-border-dark flex flex-col gap-1">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/account"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-sm text-sm font-sans font-medium uppercase tracking-widest text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      <span className="material-icons-outlined text-xl">person_outline</span>
                      Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-3 rounded-sm text-sm font-sans font-medium uppercase tracking-widest text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
                    >
                      <span className="material-icons-outlined text-xl">logout</span>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-sm text-sm font-sans font-medium uppercase tracking-widest text-primary hover:bg-primary/10 transition-colors"
                  >
                    <span className="material-icons-outlined text-xl">login</span>
                    Sign In
                  </Link>
                )}
              </div>
            </nav>

            {/* Gold accent bottom */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          </div>
        </div>
      )}

      {/* ── Cart Drawer ─────────────────────────────────────────── */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}