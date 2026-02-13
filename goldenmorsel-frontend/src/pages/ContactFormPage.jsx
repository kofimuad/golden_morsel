import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const ContactFormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      details: 'support@goldenmorsel.com',
      description: 'We\'ll respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Phone',
      details: '+233 (0) 201 234 567',
      description: 'Mon-Fri, 9 AM - 6 PM GMT',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Accra, Ghana',
      description: 'Visit us for a deeper experience',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon-Fri: 9 AM - 6 PM',
      description: 'Sat-Sun: 10 AM - 4 PM GMT',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-dark-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow p-6 text-center"
              >
                <Icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <h3 className="font-semibold text-dark-900 mb-1">{method.title}</h3>
                <p className="text-primary-600 font-medium text-sm mb-1">{method.details}</p>
                <p className="text-gray-600 text-xs">{method.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow p-8"
          >
            <h2 className="text-2xl font-bold text-dark-900 mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary-600" />
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-900 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+233 (0) 20 123 4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-900 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What is this about?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-900 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Response Time */}
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <h3 className="text-lg font-bold text-dark-900 mb-3">Quick Response</h3>
              <p className="text-gray-700">
                We value your time. Our team typically responds to inquiries within 24 hours during business hours.
              </p>
            </div>

            {/* FAQ Link */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-dark-900 mb-3">Before You Contact Us</h3>
              <p className="text-gray-700 mb-4">
                Check our FAQ page for quick answers to common questions about orders, shipping, returns, and more.
              </p>
              <a
                href="/faq"
                className="text-primary-600 font-semibold hover:underline"
              >
                View FAQ →
              </a>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-dark-900 mb-3">Stay Connected</h3>
              <p className="text-gray-700 mb-4">
                Follow us on social media for updates, promotions, and behind-the-scenes content.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-primary-600 font-semibold hover:underline text-sm">
                  Facebook
                </a>
                <a href="#" className="text-primary-600 font-semibold hover:underline text-sm">
                  Instagram
                </a>
                <a href="#" className="text-primary-600 font-semibold hover:underline text-sm">
                  Twitter
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-3">Newsletter</h3>
              <p className="text-sm mb-4">
                Subscribe to get news, special offers, and updates delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactFormPage;
