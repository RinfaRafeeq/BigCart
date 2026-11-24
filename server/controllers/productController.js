import products from "../models/productModel.js";


export const addProducts = async (req, res) => {
    try {
        const product = req.body
        const newProduct = await products.create(product)
        res.status(201).json({ success: true, message: "product added" })
    } catch (error) {
        res.status(500).json({ message: error.message, success: false })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const product = await products.find();
        res.status(200).json({ success: true, product })
    } catch (error) {
        res.status(500).json({ error: error.message, success: false })
    }
}

