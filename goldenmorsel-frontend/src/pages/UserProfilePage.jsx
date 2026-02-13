import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  Save,
  X,
  Camera,
  Edit2,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || null,
  });

  const [addressData, setAddressData] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
    isDefault: user?.address?.isDefault || false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setAddressData({
      ...addressData,
      [name]: fieldValue,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Call API to update profile
      console.log('Updating profile:', profileData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Call API to update address
      console.log('Updating address:', addressData);
      toast.success('Address updated successfully!');
    } catch (error) {
      toast.error('Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // TODO: Call API to change password
      console.log('Changing password');
      toast.success('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordChange(false);
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Upload file to server
      const reader = new FileReader();
      reader.onload = () => {
        setProfileData({
          ...profileData,
          avatar: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            My Account
          </h1>
          <p className="text-cream-300">Manage your profile and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Profile Card */}
            <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6 mb-6">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center text-4xl overflow-hidden">
                    {profileData.avatar ? (
                      <img
                        src={profileData.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-dark-900 border-2 border-dark-800 rounded-full p-2 cursor-pointer hover:bg-dark-700 transition-all"
                  >
                    <Camera className="w-4 h-4 text-primary-400" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {profileData.fullName}
                </h2>
                <p className="text-cream-400 text-sm">{profileData.email}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary-500/20 text-primary-400 border-l-2 border-primary-500'
                        : 'text-cream-300 hover:bg-dark-700/50 hover:text-cream-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </motion.button>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-3"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Edit Profile Section */}
                <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">
                      Personal Information
                    </h3>
                    {!isEditing && (
                      <motion.button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit</span>
                      </motion.button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          disabled
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-cream-400 mt-1">
                          Email cannot be changed
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          placeholder="+233 XX XXX XXXX"
                          className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          loading={loading}
                          className="bg-primary-500 hover:bg-primary-600 text-white flex-1"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          variant="secondary"
                          className="bg-dark-700 hover:bg-dark-600 text-white flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-cream-400 text-sm">Full Name</p>
                          <p className="text-white font-medium">
                            {profileData.fullName}
                          </p>
                        </div>
                        <div>
                          <p className="text-cream-400 text-sm">Email Address</p>
                          <p className="text-white font-medium">
                            {profileData.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-cream-400 text-sm">Phone Number</p>
                          <p className="text-white font-medium">
                            {profileData.phone || 'Not provided'}
                          </p>
                        </div>
                        <div>
                          <p className="text-cream-400 text-sm">
                            Member Since
                          </p>
                          <p className="text-white font-medium">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Password Change Section */}
                <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">Security</h3>
                    {!showPasswordChange && (
                      <motion.button
                        onClick={() => setShowPasswordChange(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-all"
                      >
                        <Lock className="w-4 h-4" />
                        <span>Change Password</span>
                      </motion.button>
                    )}
                  </div>

                  {showPasswordChange ? (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className={`w-full px-4 py-3 pr-12 bg-dark-700 border rounded-lg text-white focus:ring-2 focus:border-transparent ${
                              errors.currentPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-dark-600 focus:ring-primary-500'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.currentPassword && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.currentPassword}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            className={`w-full px-4 py-3 pr-12 bg-dark-700 border rounded-lg text-white focus:ring-2 focus:border-transparent ${
                              errors.newPassword
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-dark-600 focus:ring-primary-500'
                            }`}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          >
                            {showNewPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.newPassword && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.newPassword}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-cream-100 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className={`w-full px-4 py-3 bg-dark-700 border rounded-lg text-white focus:ring-2 focus:border-transparent ${
                            errors.confirmPassword
                              ? 'border-red-500 focus:ring-red-500'
                              : 'border-dark-600 focus:ring-primary-500'
                          }`}
                        />
                        {errors.confirmPassword && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="submit"
                          loading={loading}
                          className="bg-primary-500 hover:bg-primary-600 text-white flex-1"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Change Password
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setShowPasswordChange(false)}
                          variant="secondary"
                          className="bg-dark-700 hover:bg-dark-600 text-white flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <p className="text-green-300 text-sm">
                        Your account is secure. Last password change: 2 months ago
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Shipping Addresses
                </h3>

                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-cream-100 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="street"
                        value={addressData.street}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-cream-100 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={addressData.city}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-cream-100 mb-2">
                        State/Region
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={addressData.state}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-cream-100 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={addressData.zipCode}
                        onChange={handleAddressChange}
                        className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-cream-100 mb-2">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={addressData.country}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="isDefault"
                      name="isDefault"
                      checked={addressData.isDefault}
                      onChange={handleAddressChange}
                      className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <label htmlFor="isDefault" className="text-cream-300">
                      Set as default shipping address
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      loading={loading}
                      className="bg-primary-500 hover:bg-primary-600 text-white"
                    >
                      Save Address
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Other Tabs Placeholders */}
            {activeTab === 'orders' && (
              <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6 text-center py-12">
                <ShoppingBag className="w-12 h-12 text-cream-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Your Orders
                </h3>
                <p className="text-cream-400">
                  You haven't placed any orders yet
                </p>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6 text-center py-12">
                <Heart className="w-12 h-12 text-cream-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Wishlist</h3>
                <p className="text-cream-400">
                  Your wishlist is empty. Add items to get started!
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Account Settings
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">
                        Email Notifications
                      </p>
                      <p className="text-cream-400 text-sm">
                        Receive updates about orders and promotions
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">
                        Marketing Communications
                      </p>
                      <p className="text-cream-400 text-sm">
                        Receive offers and promotions
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-dark-700/50 rounded-lg">
                    <div>
                      <p className="text-white font-medium">
                        Two-Factor Authentication
                      </p>
                      <p className="text-cream-400 text-sm">
                        Enhance your account security
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;