import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      category: 'General Questions',
      faqs: [
        {
          q: 'What is Golden Morsel?',
          a: 'Golden Morsel is an e-commerce platform specializing in authentic, delicious treats and memorable experiences. We offer a curated selection of products to delight your senses.',
        },
        {
          q: 'Is Golden Morsel available for international shipping?',
          a: 'Currently, we ship within Ghana. We are working to expand our shipping destinations. Please check our website for updates on international availability.',
        },
        {
          q: 'Do you offer corporate or bulk orders?',
          a: 'Yes! We offer special pricing for bulk and corporate orders. Please contact our sales team at corporate@goldenmorsel.com for more information.',
        },
      ],
    },
    {
      category: 'Ordering & Delivery',
      faqs: [
        {
          q: 'How long does delivery take?',
          a: 'Standard delivery typically takes 2-3 business days within Accra and 3-5 business days to other regions. Express delivery options are also available.',
        },
        {
          q: 'Can I track my order?',
          a: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can use this to track your package in real-time on our platform.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept credit cards, debit cards, mobile money transfers (Vodafone Cash, MTN Money), and bank transfers. All payments are secured with SSL encryption.',
        },
        {
          q: 'Can I modify or cancel my order?',
          a: 'Orders can be modified or cancelled within 2 hours of placing them. After that, please contact our support team to discuss your options.',
        },
      ],
    },
    {
      category: 'Products & Quality',
      faqs: [
        {
          q: 'Are your products fresh?',
          a: 'Absolutely! All our products are carefully selected and prepared to ensure freshness and quality. We use proper storage and handling methods to maintain product integrity.',
        },
        {
          q: 'Do you have products for dietary restrictions?',
          a: 'We offer a variety of products. For specific dietary requirements (vegan, gluten-free, nut-free, etc.), please check individual product descriptions or contact us at support@goldenmorsel.com.',
        },
        {
          q: 'How are products packaged?',
          a: 'All products are packaged with care using sustainable, food-safe materials. We ensure products arrive in perfect condition.',
        },
        {
          q: 'Can I place a pre-order for upcoming products?',
          a: 'Yes, we offer pre-orders for limited edition and seasonal products. These will be clearly marked on our website with expected delivery dates.',
        },
      ],
    },
    {
      category: 'Account & Security',
      faqs: [
        {
          q: 'How do I create an account?',
          a: 'Click on "Register" in the top navigation, fill in your details, and follow the email verification link. Your account will be ready to use immediately.',
        },
        {
          q: 'Is my personal information secure?',
          a: 'Yes! We use industry-standard SSL encryption to protect your personal and payment information. Your data is never shared with third parties without your consent.',
        },
        {
          q: 'How do I reset my password?',
          a: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a password reset link within minutes.',
        },
        {
          q: 'How do I delete my account?',
          a: 'You can request account deletion by contacting support@goldenmorsel.com. Please note this action is permanent and all your data will be removed.',
        },
      ],
    },
    {
      category: 'Returns & Refunds',
      faqs: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 30-day return window for unused items in original packaging. Items must be returned in their original condition. See our Return Policy page for details.',
        },
        {
          q: 'How long does a refund take?',
          a: 'Refunds are processed within 5-7 business days after we receive and inspect your returned item. The refund will be credited to your original payment method.',
        },
        {
          q: 'What if my item arrived damaged?',
          a: 'Contact us immediately with photos of the damage. We\'ll arrange for a replacement or full refund at no cost to you.',
        },
        {
          q: 'Can I exchange an item instead of returning it?',
          a: 'Yes! If you\'d like to exchange an item for the same product in a different variant, we can often process this without a full return. Contact our support team to arrange this.',
        },
      ],
    },
    {
      category: 'Customer Support',
      faqs: [
        {
          q: 'How can I contact customer support?',
          a: 'You can reach our support team via email at support@goldenmorsel.com, phone at +233 (0) 201 234 567, or through the contact form on our website.',
        },
        {
          q: 'What are your customer support hours?',
          a: 'Our team is available Monday-Friday from 9 AM to 6 PM GMT, and Saturday-Sunday from 10 AM to 4 PM GMT. We aim to respond to all inquiries within 24 hours.',
        },
        {
          q: 'Do you offer live chat support?',
          a: 'Yes! Live chat is available during business hours on our website. Click the chat icon in the bottom right corner to connect with our team.',
        },
        {
          q: 'How can I provide feedback or suggestions?',
          a: 'We love hearing from our customers! Send your feedback to feedback@goldenmorsel.com. Your suggestions help us improve our service.',
        },
      ],
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
          <h1 className="text-4xl font-bold text-dark-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about Golden Morsel
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
            className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-700"
          />
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories
            .map((categoryGroup) => ({
              ...categoryGroup,
              faqs: categoryGroup.faqs.filter(
                (faq) =>
                  faq.q.toLowerCase().includes(searchQuery) ||
                  faq.a.toLowerCase().includes(searchQuery)
              ),
            }))
            .filter((cat) => cat.faqs.length > 0)
            .map((categoryGroup, categoryIdx) => (
            <motion.div
              key={categoryIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIdx * 0.05 }}
            >
              <h2 className="text-2xl font-bold text-dark-900 mb-4 flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary-600" />
                {categoryGroup.category}
              </h2>

              <div className="space-y-3">
                {categoryGroup.faqs.map((faq, faqIdx) => {
                  const uniqueIndex = `${categoryIdx}-${faqIdx}`;
                  const isExpanded = expandedIndex === uniqueIndex;

                  return (
                    <motion.div
                      key={faqIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: categoryIdx * 0.05 + faqIdx * 0.02 }}
                      className="bg-white rounded-lg shadow overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : uniqueIndex)}
                        className="w-full p-6 hover:bg-gray-50 transition text-left flex items-center justify-between"
                      >
                        <p className="font-semibold text-dark-900">{faq.q}</p>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          className="flex-shrink-0 ml-4"
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </button>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-gray-200 px-6 py-4 bg-gray-50"
                        >
                          <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            ))}
        </div>

        {/* No Results */}
        {searchQuery && faqCategories
          .map((categoryGroup) => ({
            ...categoryGroup,
            faqs: categoryGroup.faqs.filter(
              (faq) =>
                faq.q.toLowerCase().includes(searchQuery) ||
                faq.a.toLowerCase().includes(searchQuery)
            ),
          }))
          .filter((cat) => cat.faqs.length > 0).length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600">No FAQs found matching "{searchQuery}"</p>
          </motion.div>
        )}

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 bg-primary-50 rounded-lg shadow p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Didn\'t find your answer?</h2>
          <p className="text-gray-700 mb-6">
            Our customer support team is here to help. Don\'t hesitate to reach out!
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> support@goldenmorsel.com
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> +233 (0) 201 234 567
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Hours:</span> Mon-Fri 9AM-6PM, Sat-Sun 10AM-4PM GMT
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
