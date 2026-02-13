import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  BarChart3,
  ShoppingCart,
  Users,
  Box,
  Settings,
  LogOut,
  ChevronDown,
  Home,
  Bell,
  User,
} from 'lucide-react';
import { useAuth } from '../../context/authContext';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuItems = [
    {
      label: 'Dashboard',
      icon: BarChart3,
      path: '/admin/dashboard',
      badge: null,
    },
    {
      label: 'Orders',
      icon: ShoppingCart,
      path: '/admin/orders',
      badge: 12,
      submenu: [
        { label: 'All Orders', path: '/admin/orders' },
        { label: 'Pending', path: '/admin/orders?status=pending' },
        { label: 'Processing', path: '/admin/orders?status=processing' },
        { label: 'Completed', path: '/admin/orders?status=completed' },
      ],
    },
    {
      label: 'Products',
      icon: Box,
      path: '/admin/products',
      submenu: [
        { label: 'All Products', path: '/admin/products' },
        { label: 'Add Product', path: '/admin/products/add' },
        { label: 'Inventory', path: '/admin/inventory' },
        { label: 'Categories', path: '/admin/categories' },
      ],
    },
    {
      label: 'Customers',
      icon: Users,
      path: '/admin/customers',
      submenu: [
        { label: 'All Customers', path: '/admin/customers' },
        { label: 'VIP Customers', path: '/admin/customers?tier=vip' },
        { label: 'Feedback', path: '/admin/customers/feedback' },
      ],
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      submenu: [
        { label: 'General', path: '/admin/settings' },
        { label: 'Payment Methods', path: '/admin/settings/payment' },
        { label: 'Shipping', path: '/admin/settings/shipping' },
        { label: 'Email Templates', path: '/admin/settings/emails' },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;
  const isSubmenuOpen = (label) => expandedMenu === label;

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  const overlayVariants = {
    open: { opacity: 1, pointerEvents: 'auto' },
    closed: { opacity: 0, pointerEvents: 'none' },
  };

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || mobileMenuOpen) && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="fixed lg:static inset-y-0 left-0 w-72 bg-dark-800 border-r border-dark-700 flex flex-col z-40 lg:z-0"
          >
            {/* Logo Section */}
            <div className="p-6 border-b border-dark-700 flex items-center justify-between">
              <Link to="/admin/dashboard" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center text-xl">
                  🍰
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold text-white">
                    GoldenMorsel
                  </h1>
                  <p className="text-xs text-cream-300">Admin Panel</p>
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isOpen = isSubmenuOpen(item.label);
                const isItemActive = isActive(item.path);

                return (
                  <div key={item.label}>
                    <motion.button
                      onClick={() => {
                        if (item.submenu) {
                          setExpandedMenu(isOpen ? null : item.label);
                        } else {
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        isItemActive
                          ? 'bg-primary-500/20 text-primary-400 border-l-2 border-primary-500'
                          : 'text-cream-300 hover:bg-dark-700/50 hover:text-cream-100'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto mr-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.submenu && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      )}
                    </motion.button>

                    {/* Submenu */}
                    {item.submenu && (
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 space-y-1 mt-1">
                              {item.submenu.map((subitem) => (
                                <Link
                                  key={subitem.path}
                                  to={subitem.path}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={`block px-4 py-2 text-sm rounded-lg transition-all ${
                                    isActive(subitem.path)
                                      ? 'bg-primary-500/30 text-primary-400'
                                      : 'text-cream-400 hover:text-cream-100 hover:bg-dark-700/30'
                                  }`}
                                >
                                  {subitem.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-dark-700 space-y-3">
              <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-dark-700/50">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.fullName || 'Admin User'}
                  </p>
                  <p className="text-xs text-cream-400 truncate">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-dark-800 border-b border-dark-700 sticky top-0 z-20"
        >
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setMobileMenuOpen(!mobileMenuOpen);
                  } else {
                    setSidebarOpen(!sidebarOpen);
                  }
                }}
                className="lg:hidden text-cream-300 hover:text-white p-2 hover:bg-dark-700 rounded-lg transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-semibold text-white hidden sm:block">
                {menuItems.find((item) => isActive(item.path))?.label || 'Admin'}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-cream-300 hover:text-white hover:bg-dark-700 rounded-lg transition-all"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </motion.button>

              {/* Divider */}
              <div className="h-6 w-px bg-dark-700" />

              {/* User Menu */}
              <div className="flex items-center space-x-2 text-right">
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">
                    {user?.fullName || 'Admin'}
                  </p>
                  <p className="text-xs text-cream-400">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-cream-300 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-dark-900">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;