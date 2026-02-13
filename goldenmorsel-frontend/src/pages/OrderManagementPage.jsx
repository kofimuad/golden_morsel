import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Eye,
  Printer,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  TrendingUp,
  Package,
  AlertCircle,
} from 'lucide-react';
import AdminLayout from '../components/layout/AdminLayout';

const OrderManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedOrders, setSelectedOrders] = useState(new Set());

  // Mock data - replace with API call
  const mockOrders = [
    {
      id: 'ORD-001',
      customer: { name: 'Ama Serwaa', email: 'ama@example.com' },
      date: new Date('2026-02-12'),
      total: 45.99,
      status: 'completed',
      items: 3,
      paymentMethod: 'Card',
      shippingAddress: 'Kumasi, Ashanti',
    },
    {
      id: 'ORD-002',
      customer: { name: 'Kwasi Mensah', email: 'kwasi@example.com' },
      date: new Date('2026-02-11'),
      total: 78.50,
      status: 'processing',
      items: 5,
      paymentMethod: 'Bank Transfer',
      shippingAddress: 'Accra, Greater Accra',
    },
    {
      id: 'ORD-003',
      customer: { name: 'Abena Kyeremateng', email: 'abena@example.com' },
      date: new Date('2026-02-10'),
      total: 32.25,
      status: 'pending',
      items: 2,
      paymentMethod: 'Card',
      shippingAddress: 'Takoradi, Western',
    },
    {
      id: 'ORD-004',
      customer: { name: 'Kweku Brown', email: 'kweku@example.com' },
      date: new Date('2026-02-09'),
      total: 156.75,
      status: 'completed',
      items: 8,
      paymentMethod: 'Card',
      shippingAddress: 'Cape Coast, Central',
    },
    {
      id: 'ORD-005',
      customer: { name: 'Yaa Asantewaa', email: 'yaa@example.com' },
      date: new Date('2026-02-08'),
      total: 92.00,
      status: 'shipped',
      items: 4,
      paymentMethod: 'Mobile Money',
      shippingAddress: 'Kumasi, Ashanti',
    },
    {
      id: 'ORD-006',
      customer: { name: 'Kofi Osei', email: 'kofi@example.com' },
      date: new Date('2026-02-07'),
      total: 65.50,
      status: 'processing',
      items: 3,
      paymentMethod: 'Card',
      shippingAddress: 'Sekondi, Western',
    },
    {
      id: 'ORD-007',
      customer: { name: 'Adwoa Asante', email: 'adwoa@example.com' },
      date: new Date('2026-02-06'),
      total: 41.99,
      status: 'pending',
      items: 2,
      paymentMethod: 'Bank Transfer',
      shippingAddress: 'Kumasi, Ashanti',
    },
    {
      id: 'ORD-008',
      customer: { name: 'Nii Addo', email: 'nii@example.com' },
      date: new Date('2026-02-05'),
      total: 128.75,
      status: 'completed',
      items: 6,
      paymentMethod: 'Card',
      shippingAddress: 'Tema, Greater Accra',
    },
  ];

  // Filter and search
  const filteredOrders = useMemo(() => {
    let orders = mockOrders;

    // Filter by status
    if (filterStatus !== 'all') {
      orders = orders.filter((order) => order.status === filterStatus);
    }

    // Search by order ID or customer name
    if (searchTerm) {
      orders = orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'date-desc':
        orders.sort((a, b) => b.date - a.date);
        break;
      case 'date-asc':
        orders.sort((a, b) => a.date - b.date);
        break;
      case 'total-high':
        orders.sort((a, b) => b.total - a.total);
        break;
      case 'total-low':
        orders.sort((a, b) => a.total - b.total);
        break;
      default:
        break;
    }

    return orders;
  }, [searchTerm, filterStatus, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  // Stats
  const stats = {
    total: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === 'pending').length,
    processing: mockOrders.filter((o) => o.status === 'processing').length,
    completed: mockOrders.filter((o) => o.status === 'completed').length,
    totalRevenue: mockOrders.reduce((sum, o) => sum + o.total, 0),
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      processing: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      completed: 'bg-green-500/10 text-green-400 border-green-500/30',
      cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      processing: <Package className="w-4 h-4" />,
      shipped: <TrendingUp className="w-4 h-4" />,
      completed: <CheckCircle className="w-4 h-4" />,
    };
    return icons[status] || <AlertCircle className="w-4 h-4" />;
  };

  const toggleSelectAll = () => {
    if (selectedOrders.size === paginatedOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(paginatedOrders.map((o) => o.id)));
    }
  };

  const toggleSelectOrder = (orderId) => {
    const newSet = new Set(selectedOrders);
    if (newSet.has(orderId)) {
      newSet.delete(orderId);
    } else {
      newSet.add(orderId);
    }
    setSelectedOrders(newSet);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold text-white mb-2">
                Orders Management
              </h1>
              <p className="text-cream-300">
                Manage and track all customer orders
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </motion.button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                label: 'Total Orders',
                value: stats.total,
                icon: Package,
                color: 'primary',
              },
              {
                label: 'Pending',
                value: stats.pending,
                icon: Clock,
                color: 'yellow',
              },
              {
                label: 'Processing',
                value: stats.processing,
                icon: TrendingUp,
                color: 'blue',
              },
              {
                label: 'Completed',
                value: stats.completed,
                icon: CheckCircle,
                color: 'green',
              },
              {
                label: 'Revenue',
                value: `GHC ${stats.totalRevenue.toFixed(2)}`,
                icon: TrendingUp,
                color: 'primary',
              },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              const bgColors = {
                primary: 'bg-primary-500/10',
                yellow: 'bg-yellow-500/10',
                blue: 'bg-blue-500/10',
                green: 'bg-green-500/10',
              };
              const iconColors = {
                primary: 'text-primary-400',
                yellow: 'text-yellow-400',
                blue: 'text-blue-400',
                green: 'text-green-400',
              };

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${bgColors[stat.color]} border border-dark-600 rounded-xl p-4`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cream-400 text-sm font-medium">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                      </p>
                    </div>
                    <Icon
                      className={`w-8 h-8 ${iconColors[stat.color]} opacity-50`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between"
        >
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="total-high">Highest Total</option>
                <option value="total-low">Lowest Total</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-700/50 border-b border-dark-600">
                  <th className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={
                        selectedOrders.size === paginatedOrders.length &&
                        paginatedOrders.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded cursor-pointer"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cream-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-cream-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((order, idx) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-dark-600 hover:bg-dark-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.has(order.id)}
                          onChange={() => toggleSelectOrder(order.id)}
                          className="w-4 h-4 rounded cursor-pointer"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-white">
                          {order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">
                            {order.customer.name}
                          </p>
                          <p className="text-cream-400 text-sm">
                            {order.customer.email}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-cream-300">
                        {order.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-white font-medium">
                        {order.items} items
                      </td>
                      <td className="px-6 py-4 text-white font-semibold">
                        GHC {order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <div
                          className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-cream-400 hover:text-primary-400 hover:bg-dark-600 rounded-lg transition-all"
                            title="View Order"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-cream-400 hover:text-primary-400 hover:bg-dark-600 rounded-lg transition-all"
                            title="Print"
                          >
                            <Printer className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2 text-cream-400 hover:text-primary-400 hover:bg-dark-600 rounded-lg transition-all"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <p className="text-cream-400">
                        No orders found matching your criteria
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-dark-600 flex items-center justify-between bg-dark-700/30">
              <p className="text-sm text-cream-400">
                Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, filteredOrders.length)} of{' '}
                {filteredOrders.length} orders
              </p>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-cream-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-600 rounded-lg transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-medium text-sm transition-all ${
                        currentPage === page
                          ? 'bg-primary-500 text-white'
                          : 'text-cream-400 hover:bg-dark-600'
                      }`}
                    >
                      {page}
                    </motion.button>
                  )
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 text-cream-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-dark-600 rounded-lg transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default OrderManagementPage;