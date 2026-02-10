import { isValidPhone, isValidEmail, validateOrderItems } from '../utils/validators.js';

// ========== ORDER VALIDATION ==========
export const validateCreateOrder = (req, res, next) => {
  const { guestInfo, items } = req.body;

  // Check required fields exist
  if (!guestInfo || !items) {
    return res.status(400).json({
      success: false,
      message: 'guestInfo and items are required'
    });
  }

  // ===== VALIDATE GUEST INFO =====

  // Name validation
  if (!guestInfo.name || !guestInfo.name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Customer name is required and cannot be empty'
    });
  }

  if (guestInfo.name.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Customer name cannot exceed 100 characters'
    });
  }

  // Phone validation
  if (!guestInfo.phone) {
    return res.status(400).json({
      success: false,
      message: 'Customer phone is required'
    });
  }

  if (!isValidPhone(guestInfo.phone)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid phone number format. Use format: +233XXXXXXXXX'
    });
  }

  // Email validation (optional but must be valid if provided)
  if (guestInfo.email && !isValidEmail(guestInfo.email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Address validation
  if (!guestInfo.address || !guestInfo.address.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Delivery address is required'
    });
  }

  if (guestInfo.address.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Address cannot exceed 500 characters'
    });
  }

  // ===== VALIDATE ITEMS =====

  const itemsValidation = validateOrderItems(items);
  if (!itemsValidation.valid) {
    return res.status(400).json({
      success: false,
      message: itemsValidation.error
    });
  }

  // All validation passed
  next();
};

// ========== PRODUCT VALIDATION ==========
export const validateCreateProduct = (req, res, next) => {
  const { title, description, price, image, category, stock } = req.body;

  // Title validation
  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Product title is required'
    });
  }

  if (title.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Product title cannot exceed 100 characters'
    });
  }

  // Description validation
  if (!description || !description.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Product description is required'
    });
  }

  if (description.length > 500) {
    return res.status(400).json({
      success: false,
      message: 'Product description cannot exceed 500 characters'
    });
  }

  // Price validation
  if (price === undefined || price === null) {
    return res.status(400).json({
      success: false,
      message: 'Product price is required'
    });
  }

  const priceNum = parseFloat(price);
  if (isNaN(priceNum) || priceNum < 0) {
    return res.status(400).json({
      success: false,
      message: 'Product price must be a valid positive number'
    });
  }

  // Image validation
  if (!image || !image.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Product image URL is required'
    });
  }

  if (!image.startsWith('http')) {
    return res.status(400).json({
      success: false,
      message: 'Product image must be a valid URL (starting with http)'
    });
  }

  // Category validation (optional)
  if (category && !['treaties', 'memoria', 'convention'].includes(category)) {
    return res.status(400).json({
      success: false,
      message: 'Category must be one of: treaties, memoria, convention'
    });
  }

  // Stock validation (optional)
  if (stock !== undefined && stock !== null) {
    const stockNum = parseInt(stock);
    if (isNaN(stockNum) || stockNum < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock must be a valid non-negative number'
      });
    }
  }

  // All validation passed
  next();
};

// ========== USER SIGNUP VALIDATION ==========
export const validateUserSignup = (req, res, next) => {
  const { phone, password, name, email } = req.body;

  // Phone validation (required)
  if (!phone) {
    return res.status(400).json({
      success: false,
      message: 'Phone number is required'
    });
  }

  if (!isValidPhone(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid phone number format. Use format: +233XXXXXXXXX'
    });
  }

  // Password validation (optional)
  if (password && password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters'
    });
  }

  if (password && password.length > 128) {
    return res.status(400).json({
      success: false,
      message: 'Password cannot exceed 128 characters'
    });
  }

  // Name validation (optional)
  if (name && !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Name cannot be empty'
    });
  }

  if (name && name.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Name cannot exceed 100 characters'
    });
  }

  // Email validation (optional)
  if (email && !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // All validation passed
  next();
};

// ========== USER LOGIN VALIDATION ==========
export const validateUserLogin = (req, res, next) => {
  const { phone, password } = req.body;

  // Phone validation
  if (!phone) {
    return res.status(400).json({
      success: false,
      message: 'Phone number is required'
    });
  }

  if (!isValidPhone(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid phone number format. Use format: +233XXXXXXXXX'
    });
  }

  // Password validation
  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Password is required'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Invalid password'
    });
  }

  // All validation passed
  next();
};

// ========== ADMIN LOGIN VALIDATION ==========
export const validateAdminLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Email validation
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Password validation
  if (!password) {
    return res.status(400).json({
      success: false,
      message: 'Password is required'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Invalid password'
    });
  }

  // All validation passed
  next();
};