import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Lock } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import Button from '../components/common/Button';
import { whatsappService } from '../services/whatsappService';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const { cart, cartTotals, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const deliveryFee = 15.00;
  const total = cartTotals.subtotal + deliveryFee;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customer: formData,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          variant: item.selectedVariant?.name || '',
        })),
        subtotal: cartTotals.subtotal,
        deliveryFee: deliveryFee,
        total: total,
      };

      // Send to WhatsApp
      await whatsappService.sendCheckout(orderData);
      
      // Open WhatsApp
      whatsappService.openWhatsAppCheckout(orderData);

      toast.success('Redirecting to WhatsApp...');
      
      // Clear cart after short delay
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 2000);

    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Cart</span>
        </button>
        <h1 className="text-4xl font-display font-bold text-dark-900">
          Checkout Summary
        </h1>
      </div>

      <div className="space-y-8">
        {/* Order Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold text-primary-600 mb-6 uppercase tracking-wider">
            Your Feast
          </h2>

          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.cartId} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-semibold text-dark-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity}x
                    {item.selectedVariant && ` • ${item.selectedVariant.name}`}
                  </p>
                </div>
                <p className="font-bold text-dark-800">
                  GH₵ {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium">GH₵ {cartTotals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span className="font-medium">GH₵ {deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-semibold text-dark-800">Total Amount</span>
              <span className="text-2xl font-bold text-primary-600">
                GH₵ {total.toFixed(2)}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Delivery Details Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-semibold text-primary-600 mb-6 uppercase tracking-wider">
            Delivery Details
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Ama Serwaa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="ama.serwaa@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="+233 XX XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="12 Osu Crescent, Labone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                placeholder="Accra"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                placeholder="Any special instructions for delivery?"
              />
            </div>
          </div>

          {/* WhatsApp Info */}
          <div className="mt-8 p-4 bg-cream-50 rounded-lg">
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

          {/* Submit Button */}
          <div className="mt-8">
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Complete Order via WhatsApp
            </Button>

            <p className="text-xs text-center text-gray-500 mt-4 flex items-center justify-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Secured by GoldenMorsel Concierge</span>
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CheckoutPage;