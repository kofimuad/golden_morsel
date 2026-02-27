import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StorefrontRoutes from './StorefrontRoutes'
import AdminRoutes from './AdminRoutes'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*"       element={<StorefrontRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}