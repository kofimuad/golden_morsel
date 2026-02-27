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
        <Route index element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/memoria" element={<MemoriaPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmed/:orderId" element={<OrderConfirmPage />} />
        <Route path="/track" element={<OrderTrackingPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={
          <ProtectedRoute type="user"><AccountPage /></ProtectedRoute>
        } />
      </Route>
    </Routes>
  )
}
