import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../components/layout/AdminLayout'
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import DashboardPage from '../pages/admin/DashboardPage'
import OrdersPage from '../pages/admin/OrdersPage'
import AdminProductsPage from '../pages/admin/AdminProductsPage'
import InventoryPage from '../pages/admin/InventoryPage'
import AnalyticsPage from '../pages/admin/AnalyticsPage'
import ProtectedRoute from './ProtectedRoute'
import AdminManagementPage from '../pages/admin/AdminManagementPage'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
      <Route path="" element={
        <ProtectedRoute type="admin"><AdminLayout /></ProtectedRoute>
      }>
        <Route path="dashboard"  element={<DashboardPage />} />
        <Route path="orders"     element={<OrdersPage />} />
        <Route path="products"   element={<AdminProductsPage />} />
        <Route path="inventory"  element={<InventoryPage />} />
        <Route path="analytics"  element={<AnalyticsPage />} />
        <Route path="team"       element={<AdminManagementPage />} />
      </Route>
    </Routes>
  )
}