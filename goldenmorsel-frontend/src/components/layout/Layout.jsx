import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import { useStore } from '../../context/storeContext';

const Layout = ({ children }) => {
  const { state } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 bg-cream-50">
        {children}
      </main>

      {/* Cart Drawer */}
      {state.showCart && <CartDrawer />}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;