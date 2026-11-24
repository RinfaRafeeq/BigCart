
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const userData = req.body
        const newUser = await User.create(userData)

        res.status(201).json({
            message: "registration completed",
            success: true,
            newUser
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const isExist = await User.findOne({ email })

        if (!isExist) {
            return res.status(404).json({
                success: false,
                message: "user does not exist"
            })
        }

        const auth = await bcrypt.compare(password, isExist.password)

        if (!auth) {
            return res.status(401).json({
                success: false,
                message: "password incorrect"
            })
        }

        const token = jwt.sign(
            {
                id: isExist._id,
                email: isExist.email,
                role: isExist.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            sameSite: "lax",
            secure: false
        })

        res.status(200).json({
            success: true,
            message: "login success"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}



export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
