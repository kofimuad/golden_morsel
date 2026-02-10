// Validation rules
export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^(\+233|0)[2-9]\d{8}$/;
    const cleanValue = value.replace(/\s/g, '');
    if (!phoneRegex.test(cleanValue)) {
      return 'Please enter a valid Ghana phone number';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return null;
  },

  pattern: (regex, message) => (value) => {
    if (!value) return null;
    if (!regex.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },

  number: (value) => {
    if (!value) return null;
    if (isNaN(value)) {
      return 'Must be a valid number';
    }
    return null;
  },

  min: (min) => (value) => {
    if (!value) return null;
    if (parseFloat(value) < min) {
      return `Must be at least ${min}`;
    }
    return null;
  },

  max: (max) => (value) => {
    if (!value) return null;
    if (parseFloat(value) > max) {
      return `Must be no more than ${max}`;
    }
    return null;
  },

  match: (fieldName, otherValue) => (value) => {
    if (value !== otherValue) {
      return `Must match ${fieldName}`;
    }
    return null;
  },
};

// Validate single field with multiple rules
export const validateField = (value, rules) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      return error;
    }
  }
  return null;
};

// Validate entire form
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach((fieldName) => {
    const rules = validationRules[fieldName];
    const value = formData[fieldName];
    const error = validateField(value, rules);
    
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Custom validation for checkout form
export const validateCheckoutForm = (formData) => {
  const rules = {
    fullName: [validators.required, validators.minLength(2)],
    email: [validators.required, validators.email],
    phone: [validators.required, validators.phone],
    address: [validators.required, validators.minLength(5)],
    city: [validators.required],
  };

  return validateForm(formData, rules);
};

// Custom validation for contact form
export const validateContactForm = (formData) => {
  const rules = {
    name: [validators.required, validators.minLength(2)],
    email: [validators.required, validators.email],
    subject: [validators.required, validators.minLength(3)],
    message: [validators.required, validators.minLength(10)],
  };

  return validateForm(formData, rules);
};

export default {
  validators,
  validateField,
  validateForm,
  validateCheckoutForm,
  validateContactForm,
};