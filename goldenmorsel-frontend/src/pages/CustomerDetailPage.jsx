import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, ShoppingBag, Calendar, TrendingUp } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchCustomerDetails();
  }, [id]);

  const fetchCustomerDetails = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/customers/${id}`);
      // const data = await response.json();
      // setCustomer(data);
      
      // Mock data for now
      setCustomer({
        _id: id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+233 123 456 7890',
        status: 'Active',
        createdAt: '2023-06-15T10:30:00Z',
        lastPurchaseAt: '2024-01-15T10:30:00Z',
        totalOrders: 5,
        totalSpent: 650.00,
        addresses: [
          {
            _id: '1',
            type: 'Shipping',
            street: '123 Main Street',
            city: 'Accra',
            state: 'GA',
            postalCode: '00100',
            country: 'Ghana',
            isDefault: true,
          },
          {
            _id: '2',
            type: 'Billing',
            street: '456 Oak Avenue',
            city: 'Kumasi',
            state: 'AH',
            postalCode: '00200',
            country: 'Ghana',
            isDefault: false,
          },
        ],
        recentOrders: [
          {
            _id: 'ORD-001',
            orderNumber: 'ORD-2024-001234',
            date: '2024-01-15T10:30:00Z',
            total: 140.00,
            status: 'Delivered',
          },
          {
            _id: 'ORD-002',
            orderNumber: 'ORD-2024-001233',
            date: '2023-12-20T14:20:00Z',
            total: 89.50,
            status: 'Delivered',
          },
          {
            _id: 'ORD-003',
            orderNumber: 'ORD-2024-001232',
            date: '2023-11-10T09:15:00Z',
            total: 125.00,
            status: 'Delivered',
          },
        ],
        favoriteProducts: [
          { _id: '1', name: 'Chocolate Cake', purchases: 3 },
          { _id: '2', name: 'Vanilla Cupcakes', purchases: 2 },
        ],
        notes: 'VIP customer - frequently orders for special occasions',
      });
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load customer details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // TODO: Replace with actual API call
      setCustomer({ ...customer, status: newStatus });
      toast.success(`Customer status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update customer status');
    }
  };

  const handleSendEmail = () => {
    window.location.href = `mailto:${customer.email}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-900">Loading customer details...</p>
        </div>
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading customer details</p>
          <Button onClick={() => navigate('/admin/customers')}>Back to Customers</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      case 'Suspended':
        return 'warning';
      default:
        return 'info';
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin/customers')}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-dark-900" />
            </button>
            <div>
              <h1 className="text-3xl font-display font-bold text-dark-900">
                {customer.firstName} {customer.lastName}
              </h1>
              <p className="text-gray-600">Customer ID: {customer._id}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Badge variant={getStatusColor(customer.status)}>
              {customer.status}
            </Badge>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Total Orders</p>
            <p className="font-bold text-primary-600 text-3xl">
              {customer.totalOrders}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Total Spent</p>
            <p className="font-bold text-primary-600 text-2xl">
              GH₵ {customer.totalSpent.toFixed(2)}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Member Since</p>
            <p className="font-semibold text-dark-900">
              {new Date(customer.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Last Purchase</p>
            <p className="font-semibold text-dark-900">
              {new Date(customer.lastPurchaseAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tabs Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-display font-bold text-dark-900 mb-4">
                Recent Orders
              </h2>
              <div className="space-y-3">
                {customer.recentOrders.length > 0 ? (
                  customer.recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-pointer"
                      onClick={() => navigate(`/admin/orders/${order._id}`)}
                    >
                      <div>
                        <p className="font-semibold text-dark-900">{order.orderNumber}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-dark-900">
                          GH₵ {order.total.toFixed(2)}
                        </p>
                        <Badge variant={order.status === 'Delivered' ? 'success' : 'info'}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No orders yet</p>
                )}
              </div>
            </div>

            {/* Favorite Products */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-display font-bold text-dark-900 mb-4">
                Favorite Products
              </h2>
              <div className="space-y-3">
                {customer.favoriteProducts.length > 0 ? (
                  customer.favoriteProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                    >
                      <p className="font-semibold text-dark-900">{product.name}</p>
                      <span className="text-sm text-gray-600">
                        Purchased {product.purchases}x
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No favorite products</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-display font-bold text-dark-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="font-semibold text-dark-900 break-all">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="font-semibold text-dark-900">
                      {customer.phone}
                    </p>
                  </div>
                </div>
              </div>
              <Button
                fullWidth
                size="sm"
                onClick={handleSendEmail}
                className="mt-4 bg-primary-500 hover:bg-primary-600 text-white"
              >
                Send Email
              </Button>
            </div>

            {/* Shipping Addresses */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-display font-bold text-dark-900 mb-4">
                Addresses
              </h3>
              <div className="space-y-4">
                {customer.addresses.map((address) => (
                  <div
                    key={address._id}
                    className="p-3 border border-gray-200 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-dark-900">{address.type}</p>
                      {address.isDefault && (
                        <Badge variant="success" size="sm">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700">{address.street}</p>
                    <p className="text-sm text-gray-700">
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p className="text-sm text-gray-700">{address.country}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Notes */}
            {customer.notes && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-display font-bold text-dark-900 mb-4">
                  Notes
                </h3>
                <p className="text-gray-700 text-sm">{customer.notes}</p>
              </div>
            )}

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-display font-bold text-dark-900 mb-4">
                Account Status
              </h3>
              <select
                value={customer.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;