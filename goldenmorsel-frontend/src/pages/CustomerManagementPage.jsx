import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Mail, Download, Filter } from 'lucide-react';
import Button from '../components/common/Button';

const CustomerManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers] = useState([
    { id: 1, name: 'Kwesi Mensah', email: 'kwesi@example.com', phone: '+233201234567', orders: 5, totalSpent: 1250.00, status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Ama Osei', email: 'ama@example.com', phone: '+233501234567', orders: 3, totalSpent: 450.50, status: 'active', joinDate: '2024-02-20' },
    { id: 3, name: 'Kofi Owusu', email: 'kofi@example.com', phone: '+233301234567', orders: 1, totalSpent: 85.75, status: 'inactive', joinDate: '2024-03-10' },
  ]);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">{customers.length} total customers</p>
        </div>
        <Button variant="primary">
          <Download className="w-5 h-5 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Customers</p>
          <p className="text-3xl font-bold text-dark-900 mt-2">{customers.length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Active</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{customers.filter(c => c.status === 'active').length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">{customers.reduce((sum, c) => sum + c.orders, 0)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-dark-900 mt-2">GH₵ {customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}</p>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow p-4 mb-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </motion.div>

      {/* Customers Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Orders</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Total Spent</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-dark-900">{customer.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.phone}</td>
                  <td className="px-6 py-4 text-sm font-medium">{customer.orders}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-dark-900">GH₵ {customer.totalSpent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="p-1 hover:bg-gray-200 rounded text-primary-600"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No customers found</p>
          </div>
        )}
      </motion.div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedCustomer(null)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          >
            <h2 className="text-2xl font-bold text-dark-900 mb-4">{selectedCustomer.name}</h2>
            <div className="space-y-3">
              <p><span className="font-semibold">Email:</span> {selectedCustomer.email}</p>
              <p><span className="font-semibold">Phone:</span> {selectedCustomer.phone}</p>
              <p><span className="font-semibold">Total Orders:</span> {selectedCustomer.orders}</p>
              <p><span className="font-semibold">Total Spent:</span> GH₵ {selectedCustomer.totalSpent.toFixed(2)}</p>
              <p><span className="font-semibold">Customer Since:</span> {selectedCustomer.joinDate}</p>
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="secondary" onClick={() => setSelectedCustomer(null)} className="flex-1">
                Close
              </Button>
              <Button variant="primary" className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerManagementPage;
