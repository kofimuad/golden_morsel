import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item, compact = false }) => {
  const { updateCartItem, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.cartId);
    } else {
      updateCartItem(item.cartId, { quantity: newQuantity });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`flex ${compact ? 'space-x-3' : 'space-x-4'} bg-white rounded-lg ${compact ? 'p-3' : 'p-4'} shadow-sm border border-gray-100`}
    >
      {/* Image */}
      <div className={`${compact ? 'w-20 h-20' : 'w-24 h-24'} flex-shrink-0 rounded-lg overflow-hidden bg-gray-100`}>
        <img
          src={item.image || '/placeholder.jpg'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className={`font-semibold text-dark-800 ${compact ? 'text-sm' : 'text-base'}`}>
              {item.name}
            </h3>
            {item.selectedVariant && (
              <p className="text-xs text-gray-500 mt-0.5">
                {item.selectedVariant.name}
              </p>
            )}
          </div>
          <button
            onClick={() => removeFromCart(item.cartId)}
            className="p-1.5 hover:bg-red-50 rounded-full transition-colors text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <p className={`font-bold text-primary-600 ${compact ? 'text-sm' : 'text-base'}`}>
            GH₵ {(item.price * item.quantity).toFixed(2)}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-2 py-1">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-1 hover:bg-white rounded-full transition-colors"
            >
              <Minus className="w-3 h-3 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-dark-800 min-w-[20px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-1 hover:bg-white rounded-full transition-colors"
            >
              <Plus className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;