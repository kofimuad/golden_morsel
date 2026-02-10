import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Our Process', path: '/process' },
      { name: 'Stockists', path: '/stockists' },
    ],
    social: [
      { name: 'Instagram', path: 'https://instagram.com' },
      { name: 'Twitter', path: 'https://twitter.com' },
      { name: 'TikTok', path: 'https://tiktok.com' },
    ],
  };

  return (
    <footer className="bg-dark-900 text-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary-400">
                GoldenMorsel
              </h2>
            </Link>
            <p className="text-cream-200 text-sm mb-6 max-w-md font-body">
              "Born from a kitchen in Osu, GoldenMorsel is a tribute to the grandmothers who made every snack a story and every morsel a celebration."
            </p>
            <div className="mb-4">
              <p className="text-xs text-cream-300 uppercase tracking-wider mb-2">
                Crafting Nostalgia Since 2024
              </p>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-primary-400 font-semibold mb-4 uppercase tracking-wider text-sm">
              Explore
            </h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream-200 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-primary-400 font-semibold mb-4 uppercase tracking-wider text-sm">
              Social
            </h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.path}>
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream-200 hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-cream-300">
              <p>Secured by <span className="text-primary-400 font-semibold">GoldenMorsel Concierge</span></p>
              <p className="mt-1">© {currentYear} GoldenMorsel Ghana. All rights reserved.</p>
            </div>

            <motion.a
              href="https://wa.me/233123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-primary-500 text-white px-5 py-2.5 rounded-full hover:bg-primary-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Message on WhatsApp</span>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;