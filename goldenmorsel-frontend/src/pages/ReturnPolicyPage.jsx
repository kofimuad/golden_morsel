import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, CheckCircle, AlertCircle, Clock, Truck } from 'lucide-react';

const ReturnPolicyPage = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const sections = [
    {
      title: '30-Day Return Window',
      icon: Clock,
      content: 'We offer a 30-day return window from the date of purchase. To be eligible for a return, your item must be unused and in its original condition with original packaging.',
    },
    {
      title: 'How to Return Items',
      icon: Truck,
      content: 'To initiate a return, please contact our customer service team at support@goldenmorsel.com with your order number and reason for return. We will provide you with return shipping instructions and a return shipping label.',
    },
    {
      title: 'Return Shipping',
      icon: Package,
      content: 'Items returned within the 30-day window will receive a prepaid return shipping label. Items returned after 30 days are the responsibility of the customer to pay for return shipping.',
    },
    {
      title: 'Refund Process',
      icon: CheckCircle,
      content: 'Once we receive and inspect your returned item, we will process your refund within 5-7 business days. Refunds will be credited to the original payment method used for purchase.',
    },
    {
      title: 'Non-Returnable Items',
      icon: AlertCircle,
      content: 'Perishable items, opened food items, damaged items (due to customer misuse), and clearance items are not eligible for return.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-dark-900 mb-4">Return Policy</h1>
          <p className="text-gray-600 text-lg">
            Your satisfaction is our priority. Here's how our return process works.
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border-l-4 border-green-600 p-6 rounded mb-12"
        >
          <p className="text-gray-700">
            At Golden Morsel, we stand behind the quality of our products. If you're not completely satisfied with your purchase, we're here to help make it right.
          </p>
        </motion.div>

        {/* Return Policy Sections */}
        <div className="space-y-6 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            const isExpanded = expandedSection === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <button
                  onClick={() => setExpandedSection(isExpanded ? null : index)}
                  className="w-full p-6 hover:bg-gray-50 transition text-left flex items-start gap-4"
                >
                  <Icon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-dark-900">{section.title}</h2>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    className="text-gray-400 flex-shrink-0"
                  >
                    ▼
                  </motion.div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200 px-6 py-4 bg-gray-50"
                  >
                    <p className="text-gray-700">{section.content}</p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Step-by-Step Guide */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow p-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-dark-900 mb-6">Step-by-Step Return Process</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: 'Contact Us', description: 'Email support@goldenmorsel.com with your order number and reason for return' },
              { step: 2, title: 'Receive Instructions', description: 'We\'ll send you return shipping label and instructions within 24 hours' },
              { step: 3, title: 'Pack & Ship', description: 'Pack your item securely and ship it back using the provided label' },
              { step: 4, title: 'We Inspect', description: 'Upon receipt, we\'ll inspect your item within 2-3 business days' },
              { step: 5, title: 'Process Refund', description: 'Once approved, your refund will be credited within 5-7 business days' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-dark-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-lg shadow p-8"
        >
          <h2 className="text-2xl font-bold text-dark-900 mb-6">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'What if my package arrives damaged?', a: 'Please contact us immediately with photos. We\'ll arrange a replacement or refund.' },
              { q: 'Can I return items purchased on sale?', a: 'Yes, sale items can be returned within the 30-day window in accordance with our return policy.' },
              { q: 'Do I need to pay for return shipping?', a: 'No, we provide a prepaid return shipping label for items within the 30-day window.' },
              { q: 'How long does refund processing take?', a: 'Refunds are typically processed within 5-7 business days after we receive and inspect your item.' },
            ].map((qa, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-dark-900 mb-2">{qa.q}</p>
                <p className="text-gray-700 text-sm">{qa.a}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-primary-50 rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Need Help?</h2>
          <p className="text-gray-700 mb-4">
            Our customer service team is here to assist you with any questions about returns or exchanges.
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> support@goldenmorsel.com | <span className="font-semibold">Phone:</span> +233 (0) 201 234 567
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage;
