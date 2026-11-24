
import express from 'express'

import {
    register,
    login,
    getProfile
} from '../controllers/authControllers.js'

import authenticate from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

// Get logged-in user's profile
router.get("/profile", authenticate, getProfile)

export default router
