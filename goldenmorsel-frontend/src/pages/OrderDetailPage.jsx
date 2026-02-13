import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, Download, MoreVertical } from 'lucide-react';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusDropdown, setStatusDropdown] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/orders/${id}`);
      // const data = await response.json();
      // setOrder(data);
      
      // Mock data for now
      setOrder({
        _id: id,
        orderNumber: 'ORD-2024-001234',
        customerId: 'CUST-001',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        customerPhone: '+233 123 456 7890',
        status: 'Processing',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-16T14:20:00Z',
        items: [
          {
            _id: '1',
            productId: 'PROD-001',
            productName: 'Chocolate Cake',
            quantity: 2,
            price: 45.00,
            total: 90.00,
          },
          {
            _id: '2',
            productId: 'PROD-002',
            productName: 'Vanilla Cupcakes',
            quantity: 1,
            price: 25.00,
            total: 25.00,
          },
        ],
        shippingAddress: {
          street: '123 Main Street',
          city: 'Accra',
          state: 'GA',
          postalCode: '00100',
          country: 'Ghana',
        },
        subtotal: 115.00,
        shippingCost: 10.00,
        tax: 15.00,
        totalAmount: 140.00,
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        notes: 'Customer requested delivery after 3 PM',
      });
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/admin/orders/${id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus }),
      // });
      
      setOrder({ ...order, status: newStatus });
      setStatusDropdown(false);
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update order status');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    toast.info('Invoice download feature coming soon');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-900">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading order details</p>
          <Button onClick={() => navigate('/admin/orders')}>Back to Orders</Button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'warning';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'success';
      case 'Delivered':
        return 'success';
      case 'Cancelled':
        return 'danger';
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
              onClick={() => navigate('/admin/orders')}
              className="p-2 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-dark-900" />
            </button>
            <div>
              <h1 className="text-3xl font-display font-bold text-dark-900">
                Order {order.orderNumber}
              </h1>
              <p className="text-gray-600">Order ID: {order._id}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="p-2 hover:bg-white rounded-lg transition-colors"
              title="Print Order"
            >
              <Printer className="w-5 h-5 text-dark-900" />
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="p-2 hover:bg-white rounded-lg transition-colors"
              title="Download Invoice"
            >
              <Download className="w-5 h-5 text-dark-900" />
            </button>
          </div>
        </div>

        {/* Order Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Order Status</p>
            <div className="relative">
              <button
                onClick={() => setStatusDropdown(!statusDropdown)}
                className="w-full flex items-center justify-between"
              >
                <Badge variant={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
                <MoreVertical className="w-4 h-4" />
              </button>
              {statusDropdown && (
                <div className="absolute top-10 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="block w-full text-left px-4 py-2 hover:bg-cream-50 border-b last:border-b-0"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Payment Status</p>
            <Badge variant={order.paymentStatus === 'Paid' ? 'success' : 'warning'}>
              {order.paymentStatus}
            </Badge>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Order Date</p>
            <p className="font-semibold text-dark-900">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <p className="text-gray-600 text-sm mb-2">Total Amount</p>
            <p className="font-bold text-primary-600 text-xl">
              GH₵ {order.totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-display font-bold text-dark-900 mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item._id} className="flex items-center justify-between pb-4 border-b last:border-b-0">
                  <div className="flex-1">
                    <p className="font-semibold text-dark-900">{item.productName}</p>
                    <p className="text-gray-600 text-sm">Product ID: {item.productId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="font-semibold text-dark-900">
                      GH₵ {item.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Shipping */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-display font-bold text-dark-900 mb-4">
                Shipping Address
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">{order.customerName}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-display font-bold text-dark-900 mb-4">
                Order Total
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-dark-900">GH₵ {order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-dark-900">GH₵ {order.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-dark-900">GH₵ {order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-semibold text-dark-900">Total</span>
                  <span className="font-bold text-primary-600 text-lg">
                    GH₵ {order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-display font-bold text-dark-900 mb-4">
                Customer Info
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Email:</span> {order.customerEmail}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {order.customerPhone}
                </p>
                <p>
                  <span className="font-semibold">Payment Method:</span> {order.paymentMethod}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-display font-bold text-dark-900 mb-3">
              Order Notes
            </h3>
            <p className="text-gray-700">{order.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;