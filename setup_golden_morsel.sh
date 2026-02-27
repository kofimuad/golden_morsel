#!/bin/bash

# ============================================
# Golden Morsel - React + Vite Project Scaffold
# Run: bash setup_golden_morsel.sh
# ============================================

echo ""
echo "🚀 Scaffolding Golden Morsel Frontend..."
echo ""

# Create Vite project
npm create vite@latest golden-morsel -- --template react

cd golden-morsel

# Install dependencies
echo "📦 Installing dependencies..."
npm install react-router-dom axios chart.js react-chartjs-2 react-hot-toast

# Install dev dependencies
npm install -D tailwindcss postcss autoprefixer

# Init Tailwind
npx tailwindcss init -p

echo "📁 Creating folder structure..."

# ── assets ──────────────────────────────────────
mkdir -p src/assets/logos
mkdir -p src/assets/patterns

# ── components/ui ───────────────────────────────
mkdir -p src/components/ui
touch src/components/ui/Button.jsx
touch src/components/ui/Input.jsx
touch src/components/ui/Select.jsx
touch src/components/ui/Textarea.jsx
touch src/components/ui/Badge.jsx
touch src/components/ui/Modal.jsx
touch src/components/ui/Toast.jsx
touch src/components/ui/Skeleton.jsx
touch src/components/ui/Spinner.jsx
touch src/components/ui/StarRating.jsx

# ── components/layout ───────────────────────────
mkdir -p src/components/layout
touch src/components/layout/StorefrontLayout.jsx
touch src/components/layout/AdminLayout.jsx
touch src/components/layout/Header.jsx
touch src/components/layout/BottomNav.jsx
touch src/components/layout/AdminSidebar.jsx
touch src/components/layout/AdminTopbar.jsx

# ── components/product ──────────────────────────
mkdir -p src/components/product
touch src/components/product/ProductCard.jsx
touch src/components/product/ProductGrid.jsx
touch src/components/product/ProductFilters.jsx
touch src/components/product/VariantSelector.jsx
touch src/components/product/ProductImageGallery.jsx

# ── components/cart ─────────────────────────────
mkdir -p src/components/cart
touch src/components/cart/CartDrawer.jsx
touch src/components/cart/CartItem.jsx
touch src/components/cart/CartSummary.jsx

# ── components/checkout ─────────────────────────
mkdir -p src/components/checkout
touch src/components/checkout/ContactForm.jsx
touch src/components/checkout/DeliveryForm.jsx
touch src/components/checkout/OrderSummaryPanel.jsx
touch src/components/checkout/WhatsAppPaymentNote.jsx

# ── components/order ────────────────────────────
mkdir -p src/components/order
touch src/components/order/OrderCard.jsx
touch src/components/order/OrderStatusBadge.jsx
touch src/components/order/OrderTimeline.jsx
touch src/components/order/OrderItemsList.jsx

# ── components/admin ────────────────────────────
mkdir -p src/components/admin
touch src/components/admin/StatsCard.jsx
touch src/components/admin/SalesChart.jsx
touch src/components/admin/OrderTable.jsx
touch src/components/admin/OrderRow.jsx
touch src/components/admin/ConfirmPaymentModal.jsx
touch src/components/admin/ProductTable.jsx
touch src/components/admin/ProductForm.jsx
touch src/components/admin/StockTable.jsx
touch src/components/admin/InventoryLogTable.jsx
touch src/components/admin/RestockModal.jsx
touch src/components/admin/AdjustInventoryModal.jsx

# ── components/home ─────────────────────────────
mkdir -p src/components/home
touch src/components/home/HeroSection.jsx
touch src/components/home/FeaturedProducts.jsx
touch src/components/home/MemoriaSection.jsx
touch src/components/home/NewsletterBanner.jsx

# ── pages/storefront ────────────────────────────
mkdir -p src/pages/storefront
touch src/pages/storefront/HomePage.jsx
touch src/pages/storefront/ProductsPage.jsx
touch src/pages/storefront/ProductDetailPage.jsx
touch src/pages/storefront/MemoriaPage.jsx
touch src/pages/storefront/CheckoutPage.jsx
touch src/pages/storefront/OrderConfirmPage.jsx
touch src/pages/storefront/OrderTrackingPage.jsx
touch src/pages/storefront/OrderDetailPage.jsx
touch src/pages/storefront/LoginPage.jsx
touch src/pages/storefront/SignupPage.jsx
touch src/pages/storefront/AccountPage.jsx

# ── pages/admin ─────────────────────────────────
mkdir -p src/pages/admin
touch src/pages/admin/AdminLoginPage.jsx
touch src/pages/admin/DashboardPage.jsx
touch src/pages/admin/OrdersPage.jsx
touch src/pages/admin/AdminProductsPage.jsx
touch src/pages/admin/InventoryPage.jsx
touch src/pages/admin/AnalyticsPage.jsx

# ── context ─────────────────────────────────────
mkdir -p src/context
touch src/context/CartContext.jsx
touch src/context/AuthContext.jsx
touch src/context/AdminAuthContext.jsx

# ── hooks ───────────────────────────────────────
mkdir -p src/hooks
touch src/hooks/useCart.js
touch src/hooks/useAuth.js
touch src/hooks/useAdminAuth.js
touch src/hooks/useProducts.js
touch src/hooks/useOrder.js
touch src/hooks/useToast.js

# ── services ────────────────────────────────────
mkdir -p src/services
touch src/services/api.js
touch src/services/authService.js
touch src/services/productService.js
touch src/services/orderService.js
touch src/services/whatsappService.js
touch src/services/adminService.js
touch src/services/inventoryService.js

# ── utils ───────────────────────────────────────
mkdir -p src/utils
touch src/utils/formatters.js
touch src/utils/validators.js
touch src/utils/orderHelpers.js

# ── router ──────────────────────────────────────
mkdir -p src/router
touch src/router/AppRouter.jsx
touch src/router/StorefrontRoutes.jsx
touch src/router/AdminRoutes.jsx
touch src/router/ProtectedRoute.jsx

# ── .env ────────────────────────────────────────
cat > .env << 'EOF'
VITE_API_URL=http://localhost:5000/api
EOF

# ── tailwind.config.js ──────────────────────────
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#C9A84C',
        'primary-light': '#E0C370',
        'primary-dark': '#A6894A',
        'background-dark': '#0A0A0A',
        'background-light': '#FAFAFA',
        'surface-dark': '#141414',
        'surface-dark-2': '#1A1A1A',
        'surface-dark-3': '#262626',
        'border-dark': '#3A3A3A',
        'gold-dim': '#8A7019',
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", 'serif'],
        display: ["'Playfair Display'", 'serif'],
        sans: ["'Lato'", 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(201, 168, 76, 0.15)',
        'gold-glow-lg': '0 0 30px rgba(201, 168, 76, 0.25)',
      },
    },
  },
  plugins: [],
}
EOF

# ── index.css ───────────────────────────────────
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');

@layer base {
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply font-sans antialiased bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #C9A84C;
    border-radius: 3px;
  }
}

@layer components {

  /* Gold gradient text */
  .gold-text-gradient {
    background: linear-gradient(to right, #C9A84C, #E5CE85, #C9A84C);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  /* Shimmer animation on buttons */
  .shimmer-btn {
    position: relative;
    overflow: hidden;
  }
  .shimmer-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent);
    transform: skewX(-20deg);
    animation: shimmer 3s infinite;
  }
  @keyframes shimmer {
    0%   { left: -100%; }
    50%  { left: 200%;  }
    100% { left: 200%;  }
  }

  /* Gold border utility */
  .gold-border {
    border: 1px solid rgba(201, 168, 76, 0.3);
  }

  /* No scrollbar */
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  /* Memoria pattern overlay */
  .memoria-pattern-bg {
    background-image: url('/src/assets/patterns/memoria-pattern-00.png');
    background-size: 300px;
    background-repeat: repeat;
    opacity: 0.05;
  }
}
EOF

# ── App.jsx ─────────────────────────────────────
cat > src/App.jsx << 'EOF'
import AppRouter from './router/AppRouter'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { AdminAuthProvider } from './context/AdminAuthContext'

function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <CartProvider>
          <AppRouter />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#1A1A1A',
                color: '#fff',
                border: '1px solid rgba(201,168,76,0.3)',
                fontFamily: 'Lato, sans-serif',
              },
            }}
          />
        </CartProvider>
      </AdminAuthProvider>
    </AuthProvider>
  )
}

export default App
EOF

# ── main.jsx ────────────────────────────────────
cat > src/main.jsx << 'EOF'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
EOF

# ── AppRouter.jsx ────────────────────────────────
cat > src/router/AppRouter.jsx << 'EOF'
import { BrowserRouter } from 'react-router-dom'
import StorefrontRoutes from './StorefrontRoutes'
import AdminRoutes from './AdminRoutes'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <StorefrontRoutes />
      <AdminRoutes />
    </BrowserRouter>
  )
}
EOF

# ── StorefrontRoutes.jsx ─────────────────────────
cat > src/router/StorefrontRoutes.jsx << 'EOF'
import { Routes, Route } from 'react-router-dom'
import StorefrontLayout from '../components/layout/StorefrontLayout'
import HomePage from '../pages/storefront/HomePage'
import ProductsPage from '../pages/storefront/ProductsPage'
import ProductDetailPage from '../pages/storefront/ProductDetailPage'
import MemoriaPage from '../pages/storefront/MemoriaPage'
import CheckoutPage from '../pages/storefront/CheckoutPage'
import OrderConfirmPage from '../pages/storefront/OrderConfirmPage'
import OrderTrackingPage from '../pages/storefront/OrderTrackingPage'
import OrderDetailPage from '../pages/storefront/OrderDetailPage'
import LoginPage from '../pages/storefront/LoginPage'
import SignupPage from '../pages/storefront/SignupPage'
import AccountPage from '../pages/storefront/AccountPage'
import ProtectedRoute from './ProtectedRoute'

export default function StorefrontRoutes() {
  return (
    <Routes>
      <Route element={<StorefrontLayout />}>
        <Route path="/"                        element={<HomePage />} />
        <Route path="/products"                element={<ProductsPage />} />
        <Route path="/products/:id"            element={<ProductDetailPage />} />
        <Route path="/memoria"                 element={<MemoriaPage />} />
        <Route path="/checkout"                element={<CheckoutPage />} />
        <Route path="/order-confirmed/:orderId" element={<OrderConfirmPage />} />
        <Route path="/track"                   element={<OrderTrackingPage />} />
        <Route path="/orders/:orderId"         element={<OrderDetailPage />} />
        <Route path="/login"                   element={<LoginPage />} />
        <Route path="/signup"                  element={<SignupPage />} />
        <Route path="/account" element={
          <ProtectedRoute type="user">
            <AccountPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}
EOF

# ── AdminRoutes.jsx ──────────────────────────────
cat > src/router/AdminRoutes.jsx << 'EOF'
import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import DashboardPage from '../pages/admin/DashboardPage'
import OrdersPage from '../pages/admin/OrdersPage'
import AdminProductsPage from '../pages/admin/AdminProductsPage'
import InventoryPage from '../pages/admin/InventoryPage'
import AnalyticsPage from '../pages/admin/AnalyticsPage'
import ProtectedRoute from './ProtectedRoute'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={
        <ProtectedRoute type="admin">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard"  element={<DashboardPage />} />
        <Route path="orders"     element={<OrdersPage />} />
        <Route path="products"   element={<AdminProductsPage />} />
        <Route path="inventory"  element={<InventoryPage />} />
        <Route path="analytics"  element={<AnalyticsPage />} />
      </Route>
    </Routes>
  )
}
EOF

# ── ProtectedRoute.jsx ───────────────────────────
cat > src/router/ProtectedRoute.jsx << 'EOF'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, type = 'user' }) {
  const token = type === 'admin'
    ? localStorage.getItem('gm_admin_token')
    : localStorage.getItem('gm_token')

  if (!token) {
    return <Navigate to={type === 'admin' ? '/admin/login' : '/login'} replace />
  }

  return children
}
EOF

# ── Placeholder component factory ───────────────
# Creates a basic placeholder for every empty .jsx file

write_placeholder() {
  local file=$1
  local name=$(basename "$file" .jsx)
  cat > "$file" << PLACEHOLDER
export default function ${name}() {
  return (
    <div className="p-4 text-gray-400 dark:text-gray-600 text-sm font-sans">
      {/* TODO: ${name} */}
    </div>
  )
}
PLACEHOLDER
}

# Apply placeholder to all empty page and component files
for f in \
  src/pages/storefront/HomePage.jsx \
  src/pages/storefront/ProductsPage.jsx \
  src/pages/storefront/ProductDetailPage.jsx \
  src/pages/storefront/MemoriaPage.jsx \
  src/pages/storefront/CheckoutPage.jsx \
  src/pages/storefront/OrderConfirmPage.jsx \
  src/pages/storefront/OrderTrackingPage.jsx \
  src/pages/storefront/OrderDetailPage.jsx \
  src/pages/storefront/LoginPage.jsx \
  src/pages/storefront/SignupPage.jsx \
  src/pages/storefront/AccountPage.jsx \
  src/pages/admin/AdminLoginPage.jsx \
  src/pages/admin/DashboardPage.jsx \
  src/pages/admin/OrdersPage.jsx \
  src/pages/admin/AdminProductsPage.jsx \
  src/pages/admin/InventoryPage.jsx \
  src/pages/admin/AnalyticsPage.jsx \
  src/components/layout/StorefrontLayout.jsx \
  src/components/layout/AdminLayout.jsx \
  src/components/layout/Header.jsx \
  src/components/layout/BottomNav.jsx \
  src/components/layout/AdminSidebar.jsx \
  src/components/layout/AdminTopbar.jsx \
  src/components/ui/Button.jsx \
  src/components/ui/Input.jsx \
  src/components/ui/Select.jsx \
  src/components/ui/Textarea.jsx \
  src/components/ui/Badge.jsx \
  src/components/ui/Modal.jsx \
  src/components/ui/Toast.jsx \
  src/components/ui/Skeleton.jsx \
  src/components/ui/Spinner.jsx \
  src/components/ui/StarRating.jsx \
  src/components/product/ProductCard.jsx \
  src/components/product/ProductGrid.jsx \
  src/components/product/ProductFilters.jsx \
  src/components/product/VariantSelector.jsx \
  src/components/product/ProductImageGallery.jsx \
  src/components/cart/CartDrawer.jsx \
  src/components/cart/CartItem.jsx \
  src/components/cart/CartSummary.jsx \
  src/components/checkout/ContactForm.jsx \
  src/components/checkout/DeliveryForm.jsx \
  src/components/checkout/OrderSummaryPanel.jsx \
  src/components/checkout/WhatsAppPaymentNote.jsx \
  src/components/order/OrderCard.jsx \
  src/components/order/OrderStatusBadge.jsx \
  src/components/order/OrderTimeline.jsx \
  src/components/order/OrderItemsList.jsx \
  src/components/admin/StatsCard.jsx \
  src/components/admin/SalesChart.jsx \
  src/components/admin/OrderTable.jsx \
  src/components/admin/OrderRow.jsx \
  src/components/admin/ConfirmPaymentModal.jsx \
  src/components/admin/ProductTable.jsx \
  src/components/admin/ProductForm.jsx \
  src/components/admin/StockTable.jsx \
  src/components/admin/InventoryLogTable.jsx \
  src/components/admin/RestockModal.jsx \
  src/components/admin/AdjustInventoryModal.jsx \
  src/components/home/HeroSection.jsx \
  src/components/home/FeaturedProducts.jsx \
  src/components/home/MemoriaSection.jsx \
  src/components/home/NewsletterBanner.jsx
do
  write_placeholder "$f"
done

# ── Stub out service files ───────────────────────
cat > src/services/api.js << 'EOF'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// User/public API instance
const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('gm_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Admin API instance
export const adminApi = axios.create({ baseURL: BASE_URL })

adminApi.interceptors.request.use(config => {
  const token = localStorage.getItem('gm_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
EOF

cat > src/services/authService.js << 'EOF'
import api, { adminApi } from './api'

export const signup = (data) => api.post('/auth/signup', data)
export const login = (data) => api.post('/auth/login', data)
export const getMe = () => api.get('/auth/me')

export const adminLogin = (data) => adminApi.post('/auth/admin-login', data)
export const getAdminMe = () => adminApi.get('/auth/admin-me')
EOF

cat > src/services/productService.js << 'EOF'
import api from './api'

export const getProducts = (params) => api.get('/products', { params })
export const getProductById = (id) => api.get(`/products/${id}`)
export const getProductsByCategory = (category) => api.get(`/products/category/${category}`)
EOF

cat > src/services/orderService.js << 'EOF'
import api, { adminApi } from './api'

export const createOrder = (data) => api.post('/orders/create', data)
export const getOrderById = (orderId) => api.get(`/orders/${orderId}`)
export const trackByPhone = (phone) => api.get(`/orders/track/${phone}`)
export const updateOrderStatus = (orderId, data) => adminApi.put(`/orders/${orderId}/status`, data)
EOF

cat > src/services/whatsappService.js << 'EOF'
import api from './api'

export const sendCheckout = (data) => api.post('/whatsapp/send-checkout', data)
EOF

cat > src/services/adminService.js << 'EOF'
import { adminApi } from './api'

export const getDashboard = () => adminApi.get('/admin/dashboard')
export const getAllOrders = (params) => adminApi.get('/admin/orders', { params })
export const confirmPayment = (orderId, data) => adminApi.post(`/admin/orders/${orderId}/confirm-payment`, data)
export const getAnalytics = () => adminApi.get('/admin/analytics')
EOF

cat > src/services/inventoryService.js << 'EOF'
import { adminApi } from './api'

export const getStockLevels = () => adminApi.get('/inventory/stock')
export const getInventoryLogs = (params) => adminApi.get('/inventory/logs', { params })
export const getLowStockAlerts = () => adminApi.get('/inventory/alerts')
export const restockProduct = (data) => adminApi.post('/inventory/restock', data)
export const adjustInventory = (data) => adminApi.post('/inventory/adjust', data)
EOF

# ── Stub out utils ───────────────────────────────
cat > src/utils/formatters.js << 'EOF'
export const formatPrice = (amount) =>
  `GH₵ ${parseFloat(amount).toFixed(2)}`

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-GH', {
    year: 'numeric', month: 'long', day: 'numeric'
  })

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  return cleaned.startsWith('0')
    ? '+233' + cleaned.substring(1)
    : '+' + cleaned
}
EOF

cat > src/utils/validators.js << 'EOF'
export const isValidPhone = (phone) =>
  /^\+?[0-9]{10,15}$/.test(phone)

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
EOF

cat > src/utils/orderHelpers.js << 'EOF'
const VAT_RATE = 0.06
const FREE_SHIPPING_ABOVE = 200
const SHIPPING_COST = 30

export const calcSubtotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const calcVAT = (subtotal) =>
  parseFloat((subtotal * VAT_RATE).toFixed(2))

export const calcShipping = (subtotal) =>
  subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_COST

export const calcTotal = (subtotal) => {
  const vat = calcVAT(subtotal)
  const shipping = calcShipping(subtotal)
  return parseFloat((subtotal + vat + shipping).toFixed(2))
}
EOF

# ── Stub out context files ───────────────────────
cat > src/context/CartContext.jsx << 'EOF'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('gm_cart')) || []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('gm_cart', JSON.stringify(items))
  }, [items])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const addItem = (product, variant = null, qty = 1) => {
    setItems(prev => {
      const key = variant ? `${product._id}-${variant}` : product._id
      const existing = prev.find(i => i.key === key)
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, {
        key,
        productId: product._id,
        title: product.title,
        price: variant ? (product.variants?.find(v => v.name === variant)?.price ?? product.price) : product.price,
        quantity: qty,
        variant,
        image: product.image,
      }]
    })
  }

  const removeItem = (key) => setItems(prev => prev.filter(i => i.key !== key))

  const updateQty = (key, qty) => {
    if (qty <= 0) return removeItem(key)
    setItems(prev => prev.map(i => i.key === key ? { ...i, quantity: qty } : i))
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
EOF

cat > src/context/AuthContext.jsx << 'EOF'
import { createContext, useContext, useState, useEffect } from 'react'
import { login as loginService, signup as signupService, getMe } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('gm_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      getMe()
        .then(res => setUser(res.data.data))
        .catch(() => logout())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (phone, password) => {
    const res = await loginService({ phone, password })
    const { user, token } = res.data.data
    localStorage.setItem('gm_token', token)
    setToken(token)
    setUser(user)
    return user
  }

  const signup = async (data) => {
    const res = await signupService(data)
    const { user, token } = res.data.data
    localStorage.setItem('gm_token', token)
    setToken(token)
    setUser(user)
    return user
  }

  const logout = () => {
    localStorage.removeItem('gm_token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, isAuthenticated: !!token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
EOF

cat > src/context/AdminAuthContext.jsx << 'EOF'
import { createContext, useContext, useState, useEffect } from 'react'
import { adminLogin as adminLoginService, getAdminMe } from '../services/authService'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('gm_admin_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      getAdminMe()
        .then(res => setAdmin(res.data.data))
        .catch(() => logout())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email, password) => {
    const res = await adminLoginService({ email, password })
    const { admin, token } = res.data.data
    localStorage.setItem('gm_admin_token', token)
    setToken(token)
    setAdmin(admin)
    return admin
  }

  const logout = () => {
    localStorage.removeItem('gm_admin_token')
    setToken(null)
    setAdmin(null)
  }

  return (
    <AdminAuthContext.Provider value={{ admin, token, loading, isAuthenticated: !!token, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => useContext(AdminAuthContext)
EOF

# ── Hook shortcuts ───────────────────────────────
cat > src/hooks/useCart.js << 'EOF'
export { useCart } from '../context/CartContext'
EOF

cat > src/hooks/useAuth.js << 'EOF'
export { useAuth } from '../context/AuthContext'
EOF

cat > src/hooks/useAdminAuth.js << 'EOF'
export { useAdminAuth } from '../context/AdminAuthContext'
EOF

cat > src/hooks/useToast.js << 'EOF'
import toast from 'react-hot-toast'

export const useToast = () => ({
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  loading: (msg) => toast.loading(msg),
  dismiss: (id) => toast.dismiss(id),
})
EOF

# ── StorefrontLayout stub with Outlet ────────────
cat > src/components/layout/StorefrontLayout.jsx << 'EOF'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNav from './BottomNav'

export default function StorefrontLayout() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      <main className="pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
EOF

# ── AdminLayout stub with Outlet ─────────────────
cat > src/components/layout/AdminLayout.jsx << 'EOF'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-background-dark text-gray-100 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col lg:ml-60">
        <AdminTopbar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
EOF

echo ""
echo "✅ Golden Morsel frontend scaffold complete!"
echo ""
echo "📂 Project created at: ./golden-morsel"
echo ""
echo "Next steps:"
echo "  cd golden-morsel"
echo "  npm run dev"
echo ""
echo "Drop your logo/pattern assets into:"
echo "  src/assets/logos/"
echo "  src/assets/patterns/"
echo ""
