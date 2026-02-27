import { NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import gmMonogram from '../../assets/logos/gm-monogram-gold.png'

const NAV_ITEMS = [
  { to: '/',         icon: 'home',          label: 'Home'     },
  { to: '/products', icon: 'grid_view',     label: 'Shop'     },
  { to: '/track',    icon: 'local_shipping',label: 'Track'    },
  { to: '/account',  icon: 'person_outline',label: 'Account'  },
]

export default function BottomNav() {
  const { itemCount } = useCart()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background-light/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-border-dark">
      {/* Gold top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="flex items-center justify-around px-2 pt-2 pb-safe pb-3">

        {/* Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-sm transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`
          }
        >
          <span className="material-icons-outlined text-2xl">home</span>
          <span className="text-[9px] uppercase tracking-wider font-sans font-medium">Home</span>
        </NavLink>

        {/* Shop */}
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-sm transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`
          }
        >
          <span className="material-icons-outlined text-2xl">grid_view</span>
          <span className="text-[9px] uppercase tracking-wider font-sans font-medium">Shop</span>
        </NavLink>

        {/* Memoria center button */}
        <NavLink
          to="/memoria"
          className="relative -top-4 flex items-center justify-center w-14 h-14 rounded-full bg-primary shadow-gold-glow-lg border-4 border-background-light dark:border-background-dark hover:bg-primary-light transition-colors active:scale-95"
          aria-label="Memoria Collection"
        >
          <img
            src={gmMonogram}
            alt="Memoria"
            className="w-7 h-7 object-contain brightness-0"
          />
        </NavLink>

        {/* Track */}
        <NavLink
          to="/track"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1 rounded-sm transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`
          }
        >
          <span className="material-icons-outlined text-2xl">local_shipping</span>
          <span className="text-[9px] uppercase tracking-wider font-sans font-medium">Track</span>
        </NavLink>

        {/* Cart */}
        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            `relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-sm transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`
          }
        >
          <span className="material-icons-outlined text-2xl">shopping_bag</span>
          {itemCount > 0 && (
            <span className="absolute top-0 right-1 min-w-[16px] h-4 px-0.5 bg-primary text-black text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
          <span className="text-[9px] uppercase tracking-wider font-sans font-medium">Cart</span>
        </NavLink>

      </div>
    </nav>
  )
}