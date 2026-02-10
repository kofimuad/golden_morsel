import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import CartItem from './CartItem';
import Button from '../common/Button';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, cartTotals } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-dark-800">
                  Your Cart ({cartTotals.itemCount})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-600 font-medium mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Add some delicious treats to get started!
                  </p>
                  <Button onClick={onClose}>Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <CartItem key={item.cartId} item={item} compact />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4 bg-cream-50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-xl font-bold text-dark-800">
                    GH₵ {cartTotals.subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Delivery fee calculated at checkout
                </p>
                <Button
                  fullWidth
                  onClick={handleCheckout}
                  icon={<MessageCircle className="w-5 h-5" />}
                  className="bg-primary-500"
                >
                  Checkout to WhatsApp
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;