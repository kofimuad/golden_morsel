import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { useStore } from '../../context/storeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, dispatch } = useStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'Collections', path: '/collection/all' },
    { label: 'About', path: '#about' },
    { label: 'Contact', path: '#contact' },
  ];

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
            <button className="p-2 hover:bg-cream-50 rounded-lg transition-colors">
              <Search className="w-5 h-5 text-dark-700" />
            </button>
            <button className="p-2 hover:bg-cream-50 rounded-lg transition-colors">
              <User className="w-5 h-5 text-dark-700" />
            </button>
            <button
              onClick={toggleCart}
              className="relative p-2 hover:bg-cream-50 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-dark-700" />
              {state.cart.length > 0 && (
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;