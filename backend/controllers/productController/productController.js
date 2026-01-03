const productService = require('../../services/productService/productService');


//  Get all products
const getAllProducts = async (req, res) => {
    try {
        const { search, category, brand_namez, size, filtercategory, offset = 0, limit = 20 } = req.query;
        const {data,total} = await productService.getAllProducts({
            search,
            category,
            brand_namez,
            size,
            filtercategory,
            offset: Number(offset),
            limit: Number(limit),
        });
        return res.status(200).json({
            status: true,
            message: "Got all products successfully",
            data,
            total
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching products"
        });
    }
};


// Get single product by ID
const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const detailProduct = await productService.getProductById(id);
        if (!detailProduct) {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Product found",
            data: detailProduct
        });
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).json({
            status: false,
            message: "Internal server error while fetching product"
        });
    }
};


//  Create a new product
const createProduct = async (req, res) => {
    const { title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText,
        discount_price_box, image, size, filtercategory } = req.body;
    try {
        const productData = {
            title, price, description, category, plp, brand_namez,
            discountedPriceText, actualPriceText, discount_price_box,
            image, size, filtercategory
        };
        const dataAdd = await productService.createProduct(productData);
        return res.status(201).json({
            status: true,
            message: "Product added successfully",
            data: dataAdd
        });
    } catch (error) {
        console.error('Error adding product:', error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while adding product"
        });
    }
};


//  Update product
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const data = await productService.updateProduct(id, payload);
        if (!data) {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Product updated successfully",
            data: data
        });
    } catch (error) {
        console.error('Error updating product:', error);
        return res.status(500).json({
            status: false,
            message: "Error while updating product"
        });
    }
};


//  Delete product
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await productService.deleteProduct(id);
        if (!deletedProduct) {
            return res.status(404).json({
                status: false,
                message: "Product not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({
            status: false,
            message: "Error while deleting product"
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};


