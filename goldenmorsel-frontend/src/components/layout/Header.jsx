import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search, LogOut } from 'lucide-react';
import { useStore } from '../../context/storeContext';
import { useAuth } from '../../context/authContext';
import { useCartDrawer } from '../../context/cartDrawerContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { state } = useStore();
  const { isAuthenticated, user, logout } = useAuth();
  const { setIsOpen: setCartDrawerOpen } = useCartDrawer();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Collections', path: '/collection/all' },
    { label: 'About', path: '#about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setCartDrawerOpen(true);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-display font-bold text-primary-500">
              GM
            </div>
            <span className="hidden sm:inline text-sm font-body text-dark-600">
              GoldenMorsel
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-dark-700 hover:text-primary-500 transition-colors font-body text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Link
              to="/search"
              className="p-2 hover:bg-cream-50 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-dark-700" />
            </Link>

            {/* User/Profile Button */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="p-2 hover:bg-cream-50 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-dark-700" />
              </button>

              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50"
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm font-medium text-dark-900">{user?.fullName || user?.name || 'User'}</p>
                          <p className="text-xs text-gray-600">{user?.email}</p>
                        </div>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-dark-700 hover:bg-cream-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-dark-700 hover:bg-cream-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Order History
                        </Link>
                        <Link
                          to="/wishlist"
                          className="block px-4 py-2 text-sm text-dark-700 hover:bg-cream-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                        <Link
                          to="/addresses"
                          className="block px-4 py-2 text-sm text-dark-700 hover:bg-cream-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Addresses
                        </Link>
                        {user?.role === 'admin' && (
                          <>
                            <div className="border-t border-gray-200"></div>
                            <Link
                              to="/admin/dashboard"
                              className="block px-4 py-2 text-sm text-primary-600 hover:bg-cream-50 transition-colors font-medium"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              Admin Panel
                            </Link>
                          </>
                        )}
                        <div className="border-t border-gray-200"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-cream-50 transition-colors flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-dark-700 hover:bg-cream-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="block px-4 py-2 text-sm text-dark-700 hover:bg-cream-50 transition-colors border-b border-gray-200"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Register
                        </Link>
                        <Link
                          to="/admin/login"
                          className="block px-4 py-2 text-sm text-primary-600 hover:bg-cream-50 transition-colors font-medium"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Admin Login
                        </Link>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={handleCartClick}
              className="relative p-2 hover:bg-cream-50 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-dark-700" />
              {state?.cart?.length > 0 && (
                <span className="absolute top-0 right-0 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {state.cart.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2">
              {isMenuOpen ? (
                <X className="w-6 h-6 text-dark-700" />
              ) : (
                <Menu className="w-6 h-6 text-dark-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute left-0 right-0 top-16 bg-white shadow-lg border-t border-gray-200"
            >
              <div className="flex flex-col space-y-2 p-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-dark-700 hover:text-primary-500 transition-colors py-2 px-4 rounded hover:bg-cream-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <>
                    <Link
                      to="/login"
                      className="text-dark-700 hover:text-primary-500 transition-colors py-2 px-4 rounded hover:bg-cream-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/admin/login"
                      className="text-primary-600 font-medium transition-colors py-2 px-4 rounded hover:bg-cream-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Login
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;