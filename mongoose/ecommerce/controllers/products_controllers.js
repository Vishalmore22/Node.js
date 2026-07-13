import Product from "../models/products_model.js"

export const getProduct = async (req, res) => {
    try {
        const result = await Product.find();
        res.status(200).json({
            status: true,
            message: "Product fetched successfully!",
            Products: result,
        })
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Product not fetched!",
            err: err.message,
        });
    }
}
export const addProduct = async (req, res) => {
    try {
        const result = await Product.create(req.body);
        res.status(201).json({
            status: true,
            message: "Product added successfully !",
            Product: result,
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Product not added!",
            err: err.message,
        });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndUpdate(req.body.id, req.body);
        res.status(200).json({
            status: true,
            message: "Product updated successfully !",
            Product: result,
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Product not updated!",
            err: err.message,
        });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const result = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: true,
            message: "Product deleted successfully !",
            Product: result,
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: "Product not deleted!",
            err: err.message,
        });
    }
}