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
