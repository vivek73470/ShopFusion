const AllProduct = require('../../model/ProductModel/productmodel');

//  Get all products
const getAllProducts = async () => {
    return await AllProduct.find();
};

//  Get product by ID
const getProductById = async (id) => {
    return await AllProduct.findById(id);
};


//  Create a new product
const createProduct = async (productData) => {
    const newProduct = new AllProduct(productData);
    return await newProduct.save();
};


//  Update product by ID
const updateProduct = async (id, updateData) => {
    return await AllProduct.findByIdAndUpdate({ _id: id }, updateData, { new: true });
};


//  Delete product by ID
const deleteProduct = async (id) => {
    return await AllProduct.findByIdAndDelete({ _id: id });
};


//  Filter products based on query parameters
const filterProducts = async (filters) => {
    const filterArray = [];

    if (filters.category) {
        filterArray.push({ category: { $in: Array.isArray(filters.category) ? filters.category : [filters.category] } });
    }

    if (filters.brand_namez) {
        filterArray.push({ brand_namez: { $in: Array.isArray(filters.brand_namez) ? filters.brand_namez : [filters.brand_namez] } });
    }

    if (filters.filtercategory) {
        filterArray.push({ filtercategory: { $in: Array.isArray(filters.filtercategory) ? filters.filtercategory : [filters.filtercategory] } });
    }

    if (filters.size) {
        filterArray.push({ size: { $in: Array.isArray(filters.size) ? filters.size : [filters.size] } });
    }
    const query = filterArray.length ? { $and: filterArray } : {};

    // const query = filterArray.length ? { $or: filterArray } : {};
    return await AllProduct.find(query);
};


//  Search products by keyword
const searchProducts = async (keyword) => {
    const searchQuery = {
        $or: [
            { title: { $regex: keyword, $options: 'i' } },
            { brand_namez: { $regex: keyword, $options: 'i' } },
            { category: { $regex: keyword, $options: 'i' } }
        ]
    };

    return await AllProduct.find(searchQuery);
};



module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    filterProducts,
    searchProducts
};


