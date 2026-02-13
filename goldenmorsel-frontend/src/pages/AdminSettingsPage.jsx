import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Lock, Bell, Mail, Smartphone, Globe } from 'lucide-react';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    companyName: 'Golden Morsel',
    companyEmail: 'admin@goldenmorsel.com',
    phoneNumber: '+233201234567',
    website: 'www.goldenmorsel.com',
    timezone: 'GMT',
    currency: 'GHS',
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlert: true,
    orderNotifications: true,
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveSettings = (section) => {
    toast.success(`${section} settings updated successfully!`);
  };

  const handlePasswordChange = () => {
    if (settings.password !== settings.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (settings.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password changed successfully!');
    setSettings(prev => ({
      ...prev,
      password: '',
      confirmPassword: '',
    }));
  };

  return (
    <div className="p-6 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and application settings</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        {[
          { id: 'general', label: 'General', icon: Globe },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security', icon: Lock },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-600 hover:text-dark-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Info */}
            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Email</label>
              <input
                type="email"
                name="companyEmail"
                value={settings.companyEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={settings.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={settings.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Timezone</label>
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="GMT">GMT (Greenwich Mean Time)</option>
                <option value="WAT">WAT (West Africa Time)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Currency</label>
              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="GHS">GHS (Ghana Cedis)</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="EUR">EUR (Euro)</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <Button
              variant="primary"
              onClick={() => handleSaveSettings('General')}
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </Button>
          </div>
        </motion.div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-dark-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive order and system updates via email</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
            </div>

            {/* SMS Notifications */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="font-semibold text-dark-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-dark-900">Low Stock Alerts</p>
                  <p className="text-sm text-gray-600">Get notified when inventory is low</p>
                </div>
                <input
                  type="checkbox"
                  name="lowStockAlert"
                  checked={settings.lowStockAlert}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Order Notifications */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-dark-900">Order Notifications</p>
                  <p className="text-sm text-gray-600">Get notified for every new order</p>
                </div>
                <input
                  type="checkbox"
                  name="orderNotifications"
                  checked={settings.orderNotifications}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <Button
                variant="primary"
                onClick={() => handleSaveSettings('Notification')}
              >
                <Save className="w-5 h-5 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Security Settings */}
      {activeTab === 'security' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="max-w-md space-y-6">
            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Current Password</label>
              <input
                type="password"
                placeholder="Enter your current password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">New Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter new password (minimum 8 characters)"
                value={settings.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-900 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={settings.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="pt-6 border-t border-gray-200">
              <Button
                variant="primary"
                onClick={handlePasswordChange}
              >
                <Lock className="w-5 h-5 mr-2" />
                Change Password
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminSettingsPage;
