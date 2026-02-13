import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Plus, Search, Edit2 } from 'lucide-react';
import Button from '../components/common/Button';

const InventoryManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [inventory] = useState([
    { id: 1, productName: 'Golden Treat Box', sku: 'GTB-001', currentStock: 24, minStock: 10, maxStock: 50, category: 'treaties', lastRestocked: '2024-03-10', status: 'good' },
    { id: 2, name: 'Deluxe Memoria', sku: 'DM-001', currentStock: 5, minStock: 10, maxStock: 30, category: 'memoria', lastRestocked: '2024-03-05', status: 'low' },
    { id: 3, name: 'Premium Collection', sku: 'PC-001', currentStock: 2, minStock: 5, maxStock: 20, category: 'pop-ups', lastRestocked: '2024-02-28', status: 'critical' },
  ]);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minStock).length;
  const totalProducts = inventory.length;
  const avgStockHealth = Math.round((inventory.reduce((sum, item) => sum + (item.currentStock / item.maxStock), 0) / inventory.length) * 100);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-dark-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage product inventory levels</p>
        </div>
        <Button variant="primary">
          <Plus className="w-5 h-5 mr-2" />
          Add Stock
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Products</p>
          <p className="text-3xl font-bold text-dark-900 mt-2">{totalProducts}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Low Stock Alerts</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{lowStockItems}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Total Units</p>
          <p className="text-3xl font-bold text-primary-600 mt-2">{inventory.reduce((sum, item) => sum + item.currentStock, 0)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm">Stock Health</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{avgStockHealth}%</p>
        </motion.div>
      </div>

      {/* Alerts */}
      {lowStockItems > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6 flex items-start gap-3"
        >
          <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-orange-900">Low Stock Warning</p>
            <p className="text-sm text-orange-700">{lowStockItems} product(s) are below minimum stock level</p>
          </div>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow p-4 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
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
            <option value="good">Good Stock</option>
            <option value="low">Low Stock</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </motion.div>

      {/* Inventory Table */}
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">SKU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Current Stock</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Min/Max</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Last Restocked</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-dark-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map((item) => {
                const stockPercentage = (item.currentStock / item.maxStock) * 100;
                let statusColor = 'bg-green-100 text-green-700';
                if (item.status === 'low') statusColor = 'bg-orange-100 text-orange-700';
                if (item.status === 'critical') statusColor = 'bg-red-100 text-red-700';

                return (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-dark-900">{item.productName}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{item.sku}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-semibold text-dark-900">{item.currentStock}</p>
                        <div className="w-24 h-2 bg-gray-200 rounded-full mt-1">
                          <div
                            className={`h-2 rounded-full ${
                              item.status === 'critical'
                                ? 'bg-red-500'
                                : item.status === 'low'
                                ? 'bg-orange-500'
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.minStock}/{item.maxStock}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.lastRestocked}</td>
                    <td className="px-6 py-4 text-sm">
                      <button className="p-1 hover:bg-gray-200 rounded text-primary-600">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No inventory items found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default InventoryManagementPage;
