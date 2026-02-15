import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/authContext'
import StoreProvider from './context/storeContext'
import CartDrawerProvider from './context/cartDrawerContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <CartDrawerProvider>
          <App />
        </CartDrawerProvider>
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>,
)