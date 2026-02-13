import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronDown, MapPin, Calendar, Eye } from 'lucide-react';
import Button from '../components/common/Button';

const OrderHistoryPage = () => {
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orders] = useState([
    {
      id: 'ORD-2024-001',
      date: '2024-03-15',
      items: [
        { name: 'Golden Treat Box', qty: 2, price: 125.00 },
        { name: 'Premium Collection', qty: 1, price: 250.00 },
      ],
      total: 500.00,
      status: 'delivered',
      deliveryDate: '2024-03-17',
      address: '123 Main Street, Accra, Ghana',
      trackingNumber: 'TRK123456789',
    },
    {
      id: 'ORD-2024-002',
      date: '2024-03-10',
      items: [
        { name: 'Deluxe Memoria', qty: 1, price: 89.50 },
      ],
      total: 89.50,
      status: 'processing',
      deliveryDate: null,
      address: '123 Main Street, Accra, Ghana',
      trackingNumber: null,
    },
    {
      id: 'ORD-2024-003',
      date: '2024-02-28',
      items: [
        { name: 'Golden Treat Box', qty: 3, price: 125.00 },
      ],
      total: 375.00,
      status: 'cancelled',
      deliveryDate: '2024-03-02',
      address: 'Different Address',
      trackingNumber: null,
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-blue-100 text-blue-700';
      case 'shipped':
        return 'bg-purple-100 text-purple-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-900">Order History</h1>
          <p className="text-gray-600 mt-1">Track your orders and view past purchases</p>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  className="w-full p-6 hover:bg-gray-50 transition text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <Package className="w-5 h-5 text-primary-600" />
                        <p className="font-semibold text-dark-900">{order.id}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {order.date}
                        </span>
                        <span>Total: GH₵ {order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedOrder === order.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Order Details */}
                {expandedOrder === order.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 p-6 bg-gray-50"
                  >
                    {/* Items */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-dark-900 mb-3">Items</h3>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-white rounded">
                            <div>
                              <p className="text-dark-900 font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                            </div>
                            <p className="font-semibold text-dark-900">GH₵ {(item.price * item.qty).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Details */}
                    <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-dark-900 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Delivery Address
                      </h3>
                      <p className="text-gray-700">{order.address}</p>
                      {order.deliveryDate && (
                        <p className="text-sm text-gray-600 mt-2">Delivered on: {order.deliveryDate}</p>
                      )}
                    </div>

                    {/* Tracking */}
                    {order.trackingNumber && (
                      <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
                        <h3 className="font-semibold text-dark-900 mb-2">Tracking Number</h3>
                        <p className="font-mono text-primary-600">{order.trackingNumber}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                      {order.status === 'delivered' && (
                        <>
                          <Button variant="secondary" size="sm">
                            Reorder
                          </Button>
                          <Button variant="secondary" size="sm">
                            Leave Review
                          </Button>
                        </>
                      )}
                      <Button variant="secondary" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Invoice
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No orders yet</p>
              <p className="text-sm text-gray-500 mt-2">Start shopping to see your order history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
