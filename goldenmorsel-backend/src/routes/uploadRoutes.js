import express from 'express'
import { uploadProductImage } from '../middleware/upload.js'
import { adminAuthMiddleware } from '../middleware/adminMiddleware.js'

const router = express.Router()

// POST /api/upload/product-image
// Requires admin auth + multipart/form-data with field name "image"
router.post('/product-image', adminAuthMiddleware, (req, res) => {
  uploadProductImage(req, res, (err) => {
    if (err) {
      console.log('Upload error:', err.message) // ← add this
      return res.status(400).json({
        success: false,
        message: err.message || 'Image upload failed',
      })
    }

    if (!req.file) {
      console.log('No file received. Body:', req.body) // ← add this
      return res.status(400).json({
        success: false,
        message: 'No image file provided',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url:      req.file.path,
        publicId: req.file.filename,
      },
    })
  })
})

export default router