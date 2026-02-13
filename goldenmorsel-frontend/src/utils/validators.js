// utils/validators.js

export const validators = {
  // Check if field is empty
  required: (value) => {
    if (typeof value === 'string') {
      return !value.trim() ? 'This field is required' : null;
    }
    return !value ? 'This field is required' : null;
  },

  // Email validation
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Please enter a valid email address' : null;
  },

  // Phone validation (supports various formats)
  phone: (value) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return !phoneRegex.test(value.replace(/\s/g, ''))
      ? 'Please enter a valid phone number'
      : null;
  },

  // Minimum length validation
  minLength: (min) => (value) => {
    return value.length < min
      ? `Must be at least ${min} characters long`
      : null;
  },

  // Maximum length validation
  maxLength: (max) => (value) => {
    return value.length > max
      ? `Must not exceed ${max} characters`
      : null;
  },

  // URL validation
  url: (value) => {
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  // Number validation
  number: (value) => {
    return isNaN(value) ? 'Please enter a valid number' : null;
  },

  // Password strength validation
  passwordStrength: (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value))
      return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value))
      return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(value))
      return 'Password must contain at least one number';
    if (!/[!@#$%^&*]/.test(value))
      return 'Password must contain at least one special character (!@#$%^&*)';
    return null;
  },

  // Date validation
  date: (value) => {
    const date = new Date(value);
    return isNaN(date.getTime()) ? 'Please enter a valid date' : null;
  },

  // Minimum date (not before given date)
  minDate: (minDate) => (value) => {
    const date = new Date(value);
    const min = new Date(minDate);
    return date < min ? `Date must be after ${minDate}` : null;
  },

  // Maximum date (not after given date)
  maxDate: (maxDate) => (value) => {
    const date = new Date(value);
    const max = new Date(maxDate);
    return date > max ? `Date must be before ${maxDate}` : null;
  },

  // Custom regex pattern
  pattern: (regex, message) => (value) => {
    return !regex.test(value) ? message : null;
  },

  // Match another field (password confirmation)
  match: (matchValue, fieldName = 'field') => (value) => {
    return value !== matchValue ? `${fieldName} does not match` : null;
  },

  // File size validation (in bytes)
  fileSize: (maxSize) => (file) => {
    if (!file) return null;
    return file.size > maxSize
      ? `File size must not exceed ${formatFileSize(maxSize)}`
      : null;
  },

  // File type validation
  fileType: (allowedTypes) => (file) => {
    if (!file) return null;
    return !allowedTypes.includes(file.type)
      ? `Allowed file types: ${allowedTypes.join(', ')}`
      : null;
  },

  // Zip code validation (US format: 12345 or 12345-6789)
  zipCode: (value) => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return !zipRegex.test(value)
      ? 'Please enter a valid zip code (e.g., 12345 or 12345-6789)'
      : null;
  },

  // Credit card validation (Luhn algorithm)
  creditCard: (value) => {
    const sanitized = value.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(sanitized)) {
      return 'Please enter a valid credit card number';
    }

    let sum = 0;
    let isEven = false;

    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 !== 0
      ? 'Please enter a valid credit card number'
      : null;
  },

  // Expiry date validation (MM/YY format)
  expiryDate: (value) => {
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiryRegex.test(value)) {
      return 'Please enter a valid expiry date (MM/YY)';
    }

    const [month, year] = value.split('/');
    const currentDate = new Date();
    const expiryDate = new Date(
      2000 + parseInt(year),
      parseInt(month) - 1,
      1
    );

    if (expiryDate < currentDate) {
      return 'Card has expired';
    }

    return null;
  },

  // CVV validation
  cvv: (value) => {
    const cvvRegex = /^\d{3,4}$/;
    return !cvvRegex.test(value)
      ? 'Please enter a valid CVV (3 or 4 digits)'
      : null;
  },
};

/**
 * Main validation function
 * @param {string} value - The value to validate
 * @param {Array} validationRules - Array of validation functions
 * @returns {string|null} - Error message or null if valid
 */
export const validateField = (value, validationRules = []) => {
  for (let validator of validationRules) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return null;
};

/**
 * Validate entire form object
 * @param {Object} formData - The form data to validate
 * @param {Object} validationSchema - Schema defining validation rules for each field
 * @returns {Object} - Object with field names as keys and error messages as values
 *
 * Example usage:
 * const schema = {
 *   email: [validators.required, validators.email],
 *   password: [validators.required, validators.passwordStrength],
 *   confirmPassword: [validators.required, validators.match(password, 'Password')],
 * };
 * const errors = validateForm(formData, schema);
 */
export const validateForm = (formData, validationSchema) => {
  const errors = {};

  for (const [fieldName, rules] of Object.entries(validationSchema)) {
    const fieldValue = formData[fieldName];
    const error = validateField(fieldValue, rules);

    if (error) {
      errors[fieldName] = error;
    }
  }

  return errors;
};

/**
 * Format file size for display
 * @param {number} bytes - Size in bytes
 * @returns {string} - Formatted size string
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Debounce validation (useful for async validation)
 * @param {Function} validator - The validation function
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} - Debounced validator
 */
export const debounceValidator = (validator, delay = 300) => {
  let timeoutId;

  return async (value) => {
    return new Promise((resolve) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(async () => {
        const result = await validator(value);
        resolve(result);
      }, delay);
    });
  };
};

/**
 * Common validation schemas for reuse
 */
export const validationSchemas = {
  // User registration/profile
  userRegistration: {
    fullName: [validators.required, validators.minLength(2)],
    email: [validators.required, validators.email],
    phone: [validators.required, validators.phone],
    password: [validators.required, validators.passwordStrength],
    confirmPassword: [validators.required],
    agreeToTerms: [validators.required],
  },

  // Login form
  login: {
    email: [validators.required, validators.email],
    password: [validators.required],
  },

  // Password reset
  passwordReset: {
    newPassword: [validators.required, validators.passwordStrength],
    confirmPassword: [validators.required],
  },

  // Address form
  address: {
    street: [validators.required],
    city: [validators.required],
    state: [validators.required],
    zipCode: [validators.required],
    country: [validators.required],
  },

  // Credit card
  creditCard: {
    cardNumber: [validators.required, validators.creditCard],
    expiryDate: [validators.required, validators.expiryDate],
    cvv: [validators.required, validators.cvv],
    cardholderName: [validators.required],
  },

  // Product creation/editing
  product: {
    name: [validators.required, validators.minLength(3)],
    description: [validators.required, validators.minLength(10)],
    price: [validators.required, validators.number],
    sku: [validators.required],
    stock: [validators.required, validators.number],
  },

  // Contact form
  contact: {
    fullName: [validators.required],
    email: [validators.required, validators.email],
    subject: [validators.required, validators.minLength(5)],
    message: [validators.required, validators.minLength(10)],
  },
};