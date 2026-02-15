import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import { useCartDrawer } from '../../context/cartDrawerContext';
import { useAuth } from '../../context/authContext';
import Spinner from '../common/Spinner';

const Layout = ({ children }) => {
  const { isOpen, setIsOpen } = useCartDrawer();
  const { loading } = useAuth();

  // Wait for auth to load before rendering
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Header />

      <main className="flex-1 bg-cream-50">
        {children}
      </main>

      <CartDrawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />

      <Footer />
    </div>
  );
};

export default Layout;