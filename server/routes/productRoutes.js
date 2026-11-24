import express from "express";
import { addProducts, getAllProducts } from "../controllers/productController.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post("/products",authenticate, addProducts);
router.get("/products", getAllProducts)

export default router;
