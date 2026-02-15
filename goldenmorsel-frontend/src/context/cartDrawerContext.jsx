import React, { createContext, useContext, useState } from 'react';

const CartDrawerContext = createContext();

export const CartDrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CartDrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CartDrawerContext.Provider>
  );
};

export const useCartDrawer = () => {
  const context = useContext(CartDrawerContext);
  if (!context) {
    throw new Error('useCartDrawer must be used within CartDrawerProvider');
  }
  return context;
};

export default CartDrawerProvider;