import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import Button from '../components/common/Button';

const CartPage = () => {
  const { cart, cartTotals, clearCart } = useCart();
  const navigate = useNavigate();

  const deliveryFee = 15.00;
  const total = cartTotals.subtotal + deliveryFee;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        <h2 className="text-3xl font-display font-bold text-dark-900 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 font-body mb-8 text-center max-w-md">
          Looks like you haven't added any delicious treats yet. Start shopping to fill your cart!
        </p>
        <Button onClick={() => navigate('/shop')} size="lg">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Continue Shopping</span>
        </button>
        <h1 className="text-4xl font-display font-bold text-dark-900">
          Your Shopping Cart
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-dark-800">
                Cart Items ({cartTotals.itemCount})
              </h2>
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem key={item.cartId} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md p-6 sticky top-24"
          >
            <h2 className="text-xl font-semibold text-dark-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">GH₵ {cartTotals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span className="font-medium">GH₵ {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-dark-800">Total Amount</span>
                  <span className="text-2xl font-bold text-primary-600">
                    GH₵ {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              fullWidth
              size="lg"
              onClick={handleCheckout}
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Checkout to WhatsApp
            </Button>

            <div className="mt-6 p-4 bg-cream-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                  🤖
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium mb-1">
                    Our <span className="text-primary-600 font-semibold">Order Bot</span> will reach out instantly via WhatsApp
                  </p>
                  <p className="text-xs text-gray-500">
                    to confirm these details and provide secure payment options.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Click checkout to proceed to WhatsApp for personalized service and final payment confirmation.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;