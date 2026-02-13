import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, MapPin, Check } from 'lucide-react';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const AddressManagementPage = () => {
  const [addresses, setAddresses] = useState([
    { id: 1, label: 'Home', street: '123 Main Street', city: 'Accra', region: 'Greater Accra', postalCode: '00233', country: 'Ghana', isDefault: true },
    { id: 2, label: 'Office', street: '456 Business Ave', city: 'Kumasi', region: 'Ashanti', postalCode: '00201', country: 'Ghana', isDefault: false },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: 'Ghana',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = () => {
    if (!formData.label || !formData.street || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingId) {
      setAddresses(prev =>
        prev.map(addr =>
          addr.id === editingId ? { ...addr, ...formData } : addr
        )
      );
      toast.success('Address updated successfully!');
      setEditingId(null);
    } else {
      const newAddress = {
        id: Date.now(),
        ...formData,
        isDefault: addresses.length === 0,
      };
      setAddresses(prev => [...prev, newAddress]);
      toast.success('Address added successfully!');
    }

    setFormData({ label: '', street: '', city: '', region: '', postalCode: '', country: 'Ghana' });
    setShowAddForm(false);
  };

  const handleEditAddress = (address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== id));
      toast.success('Address deleted successfully!');
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(prev =>
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
    toast.success('Default address updated!');
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ label: '', street: '', city: '', region: '', postalCode: '', country: 'Ghana' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-900">Address Book</h1>
            <p className="text-gray-600 mt-1">Manage your delivery addresses</p>
          </div>
          {!showAddForm && (
            <Button
              variant="primary"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Address
            </Button>
          )}
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6 mb-6"
          >
            <h2 className="text-xl font-semibold text-dark-900 mb-6">
              {editingId ? 'Edit Address' : 'Add New Address'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-900 mb-2">Label (e.g., Home, Office)</label>
                <input
                  type="text"
                  name="label"
                  placeholder="Address label"
                  value={formData.label}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-900 mb-2">Street Address</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Street address"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-900 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-900 mb-2">Region</label>
                  <input
                    type="text"
                    name="region"
                    placeholder="Region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-dark-900 mb-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-900 mb-2">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="primary" onClick={handleAddAddress}>
                  {editingId ? 'Update Address' : 'Add Address'}
                </Button>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Addresses List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative rounded-lg shadow p-6 ${
                address.isDefault ? 'bg-primary-50 border-2 border-primary-300' : 'bg-white'
              }`}
            >
              {/* Default Badge */}
              {address.isDefault && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-medium">
                  <Check className="w-3 h-3" />
                  Default
                </div>
              )}

              {/* Address Details */}
              <div className="pr-24">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-dark-900 text-lg">{address.label}</h3>
                    <p className="text-gray-700">{address.street}</p>
                    <p className="text-gray-600">
                      {address.city}, {address.region} {address.postalCode}
                    </p>
                    <p className="text-gray-600">{address.country}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="w-full py-2 text-xs text-primary-600 hover:bg-primary-50 rounded border border-primary-200 transition"
                    >
                      Set as Default
                    </button>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="flex-1 py-2 px-3 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center gap-2 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span className="text-xs">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="flex-1 py-2 px-3 text-red-600 hover:bg-red-50 rounded flex items-center justify-center gap-2 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-xs">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {addresses.length === 0 && !showAddForm && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No addresses yet</p>
            <p className="text-sm text-gray-500 mt-2">Add your first address to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManagementPage;
