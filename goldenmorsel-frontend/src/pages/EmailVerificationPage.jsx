import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, success, error
  const [loading, setLoading] = useState(true);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus('error');
        setLoading(false);
        return;
      }

      try {
        // Simulate API call to verify email
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // In a real app, you would send the token to backend
        // const response = await api.post('/verify-email', { token });
        
        setVerificationStatus('success');
        toast.success('Email verified successfully!');
      } catch (error) {
        setVerificationStatus('error');
        toast.error('Email verification failed. Token may be expired.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-cream-50 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        {loading ? (
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-6"
            >
              <Loader className="w-12 h-12 text-primary-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-dark-900 mb-2">Verifying Email</h1>
            <p className="text-gray-600">Please wait while we verify your email address</p>
          </div>
        ) : verificationStatus === 'success' ? (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-dark-900 mb-2">Email Verified!</h1>
            <p className="text-gray-600 mb-6">Your email has been successfully verified. You can now log in to your account.</p>
            <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
              Go to Login
            </Button>
            <Button variant="secondary" className="w-full mt-3" onClick={() => navigate('/')}>
              Return Home
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <AlertCircle className="w-12 h-12 text-red-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-dark-900 mb-2">Verification Failed</h1>
            <p className="text-gray-600 mb-6">
              The verification link is invalid or has expired. Please request a new verification email.
            </p>
            <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
              Back to Login
            </Button>
          </div>
        )}

        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 pt-6 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              {email && `Verifying: ${email}`}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
