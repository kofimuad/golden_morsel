import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, FileText } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      title: 'Introduction',
      content: 'Golden Morsel ("Company," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process your personal data in connection with our website, mobile applications, and services.',
      icon: Shield,
    },
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, make a purchase, sign up for our mailing list, or contact us for support. This may include your name, email address, phone number, postal address, payment information, and other details you choose to provide.',
      icon: FileText,
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send transactional and promotional communications, respond to your inquiries, and comply with legal obligations. We may also use your information for analytics and marketing purposes.',
      icon: Mail,
    },
    {
      title: 'Information Sharing',
      content: 'We do not sell, trade, or rent your personal data to third parties. However, we may share your information with service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.',
      icon: Shield,
    },
    {
      title: 'Data Security',
      content: 'We implement appropriate technical and organizational measures designed to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.',
      icon: Shield,
    },
    {
      title: 'Your Rights',
      content: 'You have rights regarding your personal data, including the right to access, update, or delete your information. You may also opt-out of receiving marketing communications from us at any time by following the instructions in our emails or contacting us directly.',
      icon: FileText,
    },
    {
      title: 'Contact Us',
      content: 'If you have questions about this Privacy Policy or our privacy practices, please contact us at privacy@goldenmorsel.com or visit our website. We will respond to your inquiries within 30 days.',
      icon: Mail,
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
          <h1 className="text-4xl font-bold text-dark-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 text-lg">
            Last updated: March 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary-50 border-l-4 border-primary-600 p-6 rounded mb-12"
        >
          <p className="text-gray-700">
            Golden Morsel is committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy outlines how we collect, use, protect, and share your personal information.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-start gap-4">
                  <Icon className="w-6 h-6 text-primary-600 mt-1 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-dark-900 mb-3">{section.title}</h2>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Changes to Policy */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-12 bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold text-dark-900 mb-3">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy on our website and updating the "Last updated" date.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-primary-50 rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Questions?</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy or our privacy practices, please don't hesitate to contact us.
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> privacy@goldenmorsel.com
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> +233 (0) 201 234 567
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span> Accra, Ghana
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
