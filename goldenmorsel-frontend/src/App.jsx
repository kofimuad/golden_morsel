import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { StoreProvider } from './context/storeContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
// import ShopPage from './pages/ShopPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CollectionPage from './pages/CollectionPage';
// import OrderTrackingPage from './pages/OrderTrackingPage';

function App() {
  return (
    <StoreProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* <Route path="/shop" element={<ShopPage />} /> */}
            {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
            {/* <Route path="/collections" element={<CollectionPage />} /> */}
            {/* <Route path="/collections/:category" element={<CollectionPage />} /> */}
            {/* <Route path="/track/:trackingNumber" element={<OrderTrackingPage />} /> */}
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-display font-bold">404 - Page Not Found</h1></div>} />
          </Routes>
        </Layout>
        
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </StoreProvider>
  );
}

export default App;