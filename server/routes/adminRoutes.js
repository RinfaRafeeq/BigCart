
import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'
import adminMiddleware from '../middlewares/adminMiddleware.js'

const router = express.Router()

// Protect all admin routes
router.use(authenticate, adminMiddleware)

router.get('/admin/dashboard', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Admin Dashboard!'
  })
})

export default router
