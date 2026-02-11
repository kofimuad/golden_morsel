import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import Button from '../components/common/Button';
import orderService from '../services/orderService';

const OrderTrackingPage = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await orderService.trackOrder(trackingNumber);
      setOrder(response.data);
    } catch (err) {
      console.error('Error tracking order:', err);
      setError('Order not found. Please check your tracking number.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    { status: 'pending', label: 'Order Confirmed', icon: Package },
    { status: 'processing', label: 'Preparing', icon: Clock },
    { status: 'shipped', label: 'Shipped', icon: Truck },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const getStatusIndex = (status) => {
    return statusSteps.findIndex(step => step.status === status.toLowerCase());
  };

  const currentStatusIndex = order ? getStatusIndex(order.status) : -1;

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark-900 to-primary-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Track Your Order
            </h1>
            <p className="text-cream-200 font-body text-lg">
              Enter your tracking number to see your order status
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleTrack}
          className="bg-white rounded-2xl shadow-md p-8 mb-12"
        >
          <div className="mb-6">
            <label className="block text-lg font-semibold text-dark-900 mb-4">
              Tracking Number
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g., ORD-2025-0001"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
            />
            {error && (
              <p className="text-red-600 text-sm mt-2">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
          >
            Track Order
          </Button>
        </motion.form>

        {/* Order Details */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Order Header */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-1">
                    Order Number
                  </p>
                  <p className="text-2xl font-bold text-dark-900">{order.orderId}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-1">
                    Order Date
                  </p>
                  <p className="text-2xl font-bold text-dark-900">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider mb-1">
                    Total Amount
                  </p>
                  <p className="text-2xl font-bold text-primary-600">
                    GH₵ {order.total?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-display font-bold text-dark-900 mb-8">
                Order Timeline
              </h2>

              <div className="space-y-6">
                {statusSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isCompleted = index <= currentStatusIndex;
                  const isCurrent = index === currentStatusIndex;

                  return (
                    <div key={step.status} className="flex items-start space-x-6">
                      {/* Status Circle */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                            isCompleted
                              ? 'bg-primary-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`w-1 h-12 mt-2 ${
                              isCompleted ? 'bg-primary-500' : 'bg-gray-200'
                            }`}
                          />
                        )}
                      </div>

                      {/* Status Info */}
                      <div className="pt-2 flex-grow">
                        <p
                          className={`font-semibold text-lg ${
                            isCompleted ? 'text-dark-900' : 'text-gray-500'
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-sm text-primary-600 font-medium mt-1">
                            Current Status
                          </p>
                        )}
                        {isCompleted && !isCurrent && order[`${step.status}At`] && (
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(order[`${step.status}At`]).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Details */}
            {order.guestInfo && (
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
                  Delivery Details
                </h2>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark-900">{order.guestInfo.address}</p>
                        <p className="text-gray-600 text-sm">{order.guestInfo.city}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-dark-900">{order.guestInfo.phone}</p>
                        <p className="text-gray-600 text-sm">{order.guestInfo.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-display font-bold text-dark-900 mb-6">
                Order Items
              </h2>

              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-4 border-b border-gray-200 last:border-0"
                  >
                    <div>
                      <p className="font-semibold text-dark-900">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                        {item.variant && ` • ${item.variant}`}
                      </p>
                    </div>
                    <p className="font-bold text-dark-900">
                      GH₵ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">GH₵ {order.subtotal?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-medium">GH₵ {order.shipping?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-dark-900">
                  <span>Total</span>
                  <span>GH₵ {order.total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-8 text-center">
              <p className="text-dark-900 font-medium mb-4">Need help with your order?</p>
              <Button
                onClick={() => window.open('https://wa.me/233123456789', '_blank')}
                className="bg-primary-500 hover:bg-primary-600"
              >
                Contact Support
              </Button>
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !order && trackingNumber && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-md p-12 text-center"
          >
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold text-dark-900 mb-2">
              No Order Found
            </h2>
            <p className="text-gray-600 font-body mb-6">
              We couldn't find an order with that tracking number. Please check and try again.
            </p>
            <Button onClick={() => { setTrackingNumber(''); setError(null); }}>
              Try Another Number
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderTrackingPage;