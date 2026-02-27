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
