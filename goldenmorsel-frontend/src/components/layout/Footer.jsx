import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', path: '/shop' },
        { label: 'Collections', path: '/collection/all' },
        { label: 'New Arrivals', path: '/shop' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', path: '#contact' },
        { label: 'Track Order', path: '/track-order' },
        { label: 'FAQ', path: '#faq' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', path: '/#about' },
        { label: 'Blog', path: '#blog' },
        { label: 'Careers', path: '#careers' },
      ],
    },
  ];

  const socialLinks = [
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/233123456789' },
    { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
    { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  ];

  return (
    <footer className="bg-dark-900 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold text-cream-50 mb-4">
              GoldenMorsel
            </h3>
            <p className="text-cream-200 text-sm mb-4">
              Celebrating Ghanaian flavours with artisanal craftsmanship.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-dark-800 rounded-lg hover:bg-primary-500 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-display font-bold text-cream-50 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-cream-200 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-dark-800 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-cream-300 text-sm">
          <p>&copy; {currentYear} GoldenMorsel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#privacy" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#terms" className="hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;