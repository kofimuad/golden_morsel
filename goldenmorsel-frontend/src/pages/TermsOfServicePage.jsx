import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Scale, ShieldAlert } from 'lucide-react';

const TermsOfServicePage = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using the Golden Morsel website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
      icon: FileText,
    },
    {
      title: 'Use License',
      content: 'Permission is granted to temporarily download one copy of the materials (information or software) on Golden Morsel for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modifying or copying the materials; using the materials for any commercial purpose; attempting to decompile or reverse engineer any software; removing any copyright or other proprietary notations; or transferring the materials to another person or "mirroring" the materials on any other server.',
      icon: Scale,
    },
    {
      title: 'Disclaimer',
      content: 'The materials on Golden Morsel\'s website are provided on an "as is" basis. Golden Morsel makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
      icon: AlertTriangle,
    },
    {
      title: 'Limitations',
      content: 'In no event shall Golden Morsel or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Golden Morsel\'s website, even if Golden Morsel or an authorized representative has been notified orally or in writing of the possibility of such damage.',
      icon: ShieldAlert,
    },
    {
      title: 'Accuracy of Materials',
      content: 'The materials appearing on Golden Morsel\'s website could include technical, typographical, or photographic errors. Golden Morsel does not warrant that any of the materials on its website are accurate, complete, or current. Golden Morsel may make changes to the materials contained on its website at any time without notice.',
      icon: FileText,
    },
    {
      title: 'Links',
      content: 'Golden Morsel has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Golden Morsel of the site. Use of any such linked website is at the user\'s own risk.',
      icon: FileText,
    },
    {
      title: 'Modifications',
      content: 'Golden Morsel may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
      icon: FileText,
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
          <h1 className="text-4xl font-bold text-dark-900 mb-4">Terms of Service</h1>
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
            These Terms of Service ("Terms") constitute a legal agreement between you and Golden Morsel regarding your use of our website and services. Please read these Terms carefully before using our platform.
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

        {/* Governing Law */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-12 bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold text-dark-900 mb-3">Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of Ghana, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-primary-50 rounded-lg shadow p-6"
        >
          <h2 className="text-2xl font-bold text-dark-900 mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> support@goldenmorsel.com
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

export default TermsOfServicePage;
