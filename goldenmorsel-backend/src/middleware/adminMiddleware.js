import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const adminAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin || !admin.active) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found or inactive'
      });
    }

    req.admin = admin;
    req.adminId = admin._id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired admin token'
    });
  }
};

export const adminRoleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    if (req.admin.role !== requiredRole && req.admin.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    next();
  };
};

export const adminPermissionMiddleware = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.admin.permissions.includes(requiredPermission) && req.admin.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    next();
  };
};