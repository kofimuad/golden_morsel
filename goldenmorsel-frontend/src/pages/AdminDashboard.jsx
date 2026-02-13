import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, ShoppingCart, Users, TrendingUp, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const AdminDashboard = () => {
  const [stats] = useState({
    totalRevenue: 12850.50,
    monthlyChange: 12.5,
    totalOrders: 142,
    ordersChange: 8.2,
    totalCustomers: 89,
    customersChange: 5.3,
    avgOrderValue: 90.50,
    orderValueChange: 3.8,
  });

  const [recentOrders] = useState([
    { id: 1, customer: 'Kwesi Mensah', amount: 450.00, date: '2024-03-15', status: 'delivered' },
    { id: 2, customer: 'Ama Osei', amount: 275.50, date: '2024-03-14', status: 'pending' },
    { id: 3, customer: 'Kofi Owusu', amount: 125.75, date: '2024-03-13', status: 'processing' },
  ]);

  const [topProducts] = useState([
    { name: 'Golden Treat Box', sales: 45, revenue: 5625.00 },
    { name: 'Deluxe Memoria', sales: 32, revenue: 2864.00 },
    { name: 'Premium Collection', sales: 18, revenue: 1575.00 },
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-dark-900 mt-2">GH₵ {stats.totalRevenue.toFixed(2)}</p>
              <p className="text-xs text-gray-600 mt-2">This month</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            {stats.monthlyChange}% from last month
          </div>
        </motion.div>

        {/* Total Orders */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-dark-900 mt-2">{stats.totalOrders}</p>
              <p className="text-xs text-gray-600 mt-2">This month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            {stats.ordersChange}% from last month
          </div>
        </motion.div>

        {/* Total Customers */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Customers</p>
              <p className="text-3xl font-bold text-dark-900 mt-2">{stats.totalCustomers}</p>
              <p className="text-xs text-gray-600 mt-2">Active users</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            {stats.customersChange}% from last month
          </div>
        </motion.div>

        {/* Avg Order Value */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-600 text-sm">Avg Order Value</p>
              <p className="text-3xl font-bold text-dark-900 mt-2">GH₵ {stats.avgOrderValue.toFixed(2)}</p>
              <p className="text-xs text-gray-600 mt-2">Average per order</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-600 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            {stats.orderValueChange}% from last month
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-dark-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div>
                  <p className="font-semibold text-dark-900">{order.customer}</p>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-dark-900">GH₵ {order.amount.toFixed(2)}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'delivered'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'processing'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-dark-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-orange-600" />
                <p className="text-sm font-semibold text-orange-900">Low Stock Items</p>
              </div>
              <p className="text-2xl font-bold text-orange-600">3</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-semibold text-blue-900 mb-2">Pending Orders</p>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-semibold text-green-900 mb-2">Active Products</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 bg-white rounded-lg shadow p-6"
      >
        <h2 className="text-xl font-bold text-dark-900 mb-4">Top Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topProducts.map((product, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="font-semibold text-dark-900">{product.name}</p>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-xs text-gray-600">Sales</p>
                  <p className="text-lg font-bold text-primary-600">{product.sales}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Revenue</p>
                  <p className="text-lg font-bold text-dark-900">GH₵ {product.revenue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
