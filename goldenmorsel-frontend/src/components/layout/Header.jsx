import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import CartDrawer from '../cart/CartDrawer';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartTotals } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Collections', path: '/collections' },
    { name: 'Our Story', path: '/story' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-cream-50/95 backdrop-blur-md border-b border-primary-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                className="text-2xl sm:text-3xl font-display font-bold text-primary-600"
                whileHover={{ scale: 1.05 }}
              >
                GoldenMorsel
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-dark-700 hover:text-primary-600 font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-primary-50 rounded-full transition-colors hidden sm:block">
                <Search className="w-5 h-5 text-dark-700" />
              </button>

              <button className="p-2 hover:bg-primary-50 rounded-full transition-colors hidden sm:block">
                <User className="w-5 h-5 text-dark-700" />
              </button>

              {/* Cart Icon */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-primary-50 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-dark-700" />
                {cartTotals.itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {cartTotals.itemCount}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-primary-50 rounded-full transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-dark-700" />
                ) : (
                  <Menu className="w-6 h-6 text-dark-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-primary-200/30 bg-cream-50"
            >
              <nav className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-dark-700 hover:text-primary-600 font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-3 border-t border-primary-200/30 space-y-3">
                  <button className="flex items-center space-x-2 py-2 text-dark-700 hover:text-primary-600 font-medium transition-colors w-full">
                    <Search className="w-5 h-5" />
                    <span>Search</span>
                  </button>
                  <button className="flex items-center space-x-2 py-2 text-dark-700 hover:text-primary-600 font-medium transition-colors w-full">
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;