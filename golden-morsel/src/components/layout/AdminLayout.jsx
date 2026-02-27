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
