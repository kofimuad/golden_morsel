import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-9xl font-display font-bold text-primary-400 mb-4">
            404
          </div>
        </motion.div>

        {/* Emoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="text-8xl mb-8"
        >
          🍰
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl sm:text-5xl font-display font-bold text-white mb-4"
        >
          Oops! Page Not Found
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-cream-200 font-body mb-12"
        >
          Looks like we couldn't find the page you're looking for. It might have been moved or deleted, or perhaps you followed a broken link.
        </motion.p>

        {/* Fun message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-dark-700/50 backdrop-blur-sm border border-primary-500/20 rounded-xl p-6 mb-12"
        >
          <p className="text-cream-200 font-body">
            But hey, we always have fresh treats available at home. Why not head back and grab something delicious?
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <Button
            size="lg"
            onClick={() => navigate('/')}
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            Back to Home
          </Button>

          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/shop')}
              className="text-primary-400 border-primary-400 hover:bg-primary-400/10"
            >
              Shop Treats
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.open('https://wa.me/233123456789', '_blank')}
              className="text-cream-200 hover:text-white"
            >
              Contact Us
            </Button>
          </div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 text-4xl opacity-20"
        >
          🍪
        </motion.div>

        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 right-10 text-4xl opacity-20"
        >
          🎂
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;