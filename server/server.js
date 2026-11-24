import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dns from 'dns'

import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import adminRoutes from './routes/adminRoutes.js'



dns.setServers(["8.8.8.8"])
const app = express()

dotenv.config()
connectDB()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}))

app.use(authRoutes)
app.use(productRoutes)
app.use(cartRoutes)
app.use(adminRoutes)




app.listen(5000, () => {
    console.log("server running");

})


