import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/authContext';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Demo credentials
  const demoCredentials = [
    {
      email: 'admin@goldenmorsel.com',
      password: 'Admin@123456',
    },
    {
      email: 'demo@example.com',
      password: 'DemoAdmin123',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDemoLogin = (credentials) => {
    setFormData(credentials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Validate against demo credentials
      const validCredential = demoCredentials.find(
        (cred) => cred.email === formData.email && cred.password === formData.password
      );

      if (!validCredential) {
        toast.error('Invalid email or password');
        setLoading(false);
        return;
      }

      // Mock admin login
      const adminData = {
        id: 'admin-' + Date.now(),
        email: formData.email,
        name: formData.email.split('@')[0],
        role: 'admin',
        createdAt: new Date().toISOString(),
      };

      const token = 'admin-token-' + Date.now();
      login(adminData, token);

      toast.success('Admin login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #C17E3E 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-6">
              <span className="text-3xl">🍰</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-cream-200 font-body">
              GoldenMorsel Management Dashboard
            </p>
          </motion.div>
        </div>

        {/* Demo Credentials Info */}
        {showDemoCredentials && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4"
          >
            <div className="flex items-start space-x-3 mb-3">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-200 mb-2">
                  Demo Credentials Available
                </p>
                <div className="space-y-2">
                  {demoCredentials.map((cred, idx) => (
                    <div key={idx} className="text-xs text-blue-300 bg-blue-900/30 p-2 rounded">
                      <p className="font-mono">Email: {cred.email}</p>
                      <p className="font-mono">Password: {cred.password}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setShowDemoCredentials(false)}
                className="text-blue-400 hover:text-blue-300 text-lg"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-8 space-y-6"
        >
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-cream-100 mb-3">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@goldenmorsel.com"
                className="w-full pl-12 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-cream-100 mb-3">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cream-100 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
            className="bg-primary-500 hover:bg-primary-600 text-white"
          >
            Sign In as Admin
          </Button>
        </motion.form>

        {/* Demo Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 space-y-3"
        >
          <p className="text-center text-cream-400 text-sm font-medium">
            Quick Demo Login
          </p>
          {demoCredentials.map((cred, idx) => (
            <button
              key={idx}
              onClick={() => handleDemoLogin(cred)}
              className="w-full px-4 py-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 hover:border-primary-500 text-cream-100 rounded-lg transition-all text-sm"
            >
              Login as {cred.email.split('@')[0]}
            </button>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-cream-400 text-xs">
            This is a demo admin portal. Use the provided credentials above to access the dashboard.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;