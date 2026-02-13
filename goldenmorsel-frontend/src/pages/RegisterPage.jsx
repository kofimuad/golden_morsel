import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/authContext';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import { toast } from 'react-toastify';
import { validateField, validators } from '../utils/validators';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, setError, clearError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate full name
    const nameError = validateField(formData.fullName, [
      validators.required,
      validators.minLength(2),
    ]);
    if (nameError) newErrors.fullName = nameError;

    // Validate email
    const emailError = validateField(formData.email, [
      validators.required,
      validators.email,
    ]);
    if (emailError) newErrors.email = emailError;

    // Validate phone
    const phoneError = validateField(formData.phone, [
      validators.required,
      validators.phone,
    ]);
    if (phoneError) newErrors.phone = phoneError;

    // Validate password
    const passwordError = validateField(formData.password, [
      validators.required,
      validators.minLength(8),
    ]);
    if (passwordError) newErrors.password = passwordError;

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate terms
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setLoading(true);

    try {
      // TODO: Call actual API endpoint
      // For now, mock registration
      const userData = {
        id: 'user-' + Date.now(),
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      const token = 'user-token-' + Date.now();
      register(userData, token);

      toast.success('Registration successful! Welcome to GoldenMorsel!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = {
    none: 0,
    weak: 1,
    fair: 2,
    good: 3,
    strong: 4,
  };

  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return 'none';
    if (pwd.length < 8) return 'weak';
    if (/^[a-zA-Z]+$/.test(pwd)) return 'fair';
    if (/^[a-zA-Z0-9]+$/.test(pwd)) return 'good';
    return 'strong';
  };

  const strength = getPasswordStrength();
  const strengthColors = {
    none: 'bg-gray-300',
    weak: 'bg-red-500',
    fair: 'bg-yellow-500',
    good: 'bg-blue-500',
    strong: 'bg-green-500',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 flex items-center justify-center px-4 relative overflow-hidden py-12">
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
              Join GoldenMorsel
            </h1>
            <p className="text-cream-200 font-body text-sm">
              Create your account to start enjoying artisanal treats
            </p>
          </motion.div>
        </div>

        {/* Form Card */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-dark-800/50 backdrop-blur-sm border border-primary-500/20 rounded-2xl p-6 space-y-4"
        >
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium text-cream-100 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ama Serwaa"
                className={`w-full pl-12 pr-4 py-3 bg-dark-700 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-all ${
                  errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-dark-600 focus:ring-primary-500'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.fullName}</span>
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-cream-100 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ama@example.com"
                className={`w-full pl-12 pr-4 py-3 bg-dark-700 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-all ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : 'border-dark-600 focus:ring-primary-500'
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-cream-100 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+233 XX XXX XXXX"
                className={`w-full pl-12 pr-4 py-3 bg-dark-700 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-all ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-dark-600 focus:ring-primary-500'
                }`}
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-cream-100 mb-2">
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
                className={`w-full pl-12 pr-12 py-3 bg-dark-700 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-all ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : 'border-dark-600 focus:ring-primary-500'
                }`}
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
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="flex-grow bg-dark-700 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all ${strengthColors[strength]}`}
                      style={{
                        width: `${(passwordStrength[strength] / passwordStrength.strong) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 capitalize">{strength}</span>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-cream-100 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-12 pr-12 py-3 bg-dark-700 border rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent transition-all ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-dark-600 focus:ring-primary-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cream-100 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {formData.confirmPassword && !errors.confirmPassword && (
              <div className="mt-1 flex items-center space-x-1 text-green-400 text-xs">
                <CheckCircle className="w-4 h-4" />
                <span>Passwords match</span>
              </div>
            )}
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.confirmPassword}</span>
              </p>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="w-4 h-4 mt-1 rounded border-gray-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
            />
            <label htmlFor="agreeToTerms" className="text-xs text-gray-400 cursor-pointer">
              I agree to the{' '}
              <Link to="/terms" className="text-primary-400 hover:text-primary-300">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary-400 hover:text-primary-300">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-red-400 text-xs flex items-center space-x-1">
              <AlertCircle className="w-3 h-3" />
              <span>{errors.agreeToTerms}</span>
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
            className="bg-primary-500 hover:bg-primary-600 text-white mt-6"
          >
            Create Account
          </Button>
        </motion.form>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-cream-300 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;