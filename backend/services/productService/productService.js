const AllProduct = require('../../model/ProductModel/productmodel');

const normalize = (v) => {
  if (!v) return [];
  if (Array.isArray(v)) return v;
  return v.split(",").filter(Boolean);
};

const getAllProducts = async ({
  search,
  category,
  brand_namez,
  size,
  filtercategory,
  offset,
  limit,
}) => {
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
      { brand_namez: { $regex: search, $options: "i" } },
      { filtercategory: { $regex: search, $options: "i" } },
    ];
  }

  if (normalize(category).length)
    query.category = { $in: normalize(category) };

  if (normalize(brand_namez).length)
    query.brand_namez = { $in: normalize(brand_namez) };

  if (normalize(size).length)
    query.size = { $in: normalize(size) };

  if (normalize(filtercategory).length)
    query.filtercategory = { $in: normalize(filtercategory) };

  const total = await AllProduct.countDocuments(query);

  const data = await AllProduct.find(query)
    .skip(offset)
    .limit(limit)
    .sort({ createdAt: -1 });

  return { data, total };
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
// const filterProducts = async (filters) => {
//     const filterArray = [];

//     if (filters.category?.length) {
//         filterArray.push({ category: { $in: filters.category } });
//     }

//     if (filters.brand_namez?.length) {
//         filterArray.push({ brand_namez: { $in: filters.brand_namez } });
//     }

//     if (filters.filtercategory?.length) {
//         filterArray.push({ filtercategory: { $in: filters.filtercategory } });
//     }

//     if (filters.size?.length) {
//         filterArray.push({ size: { $in: filters.size } });
//     }

//     const query = filterArray.length ? { $and: filterArray } : {};
//     return await AllProduct.find(query);
// };



//  Search products by keyword
// const searchProducts = async (keyword) => {
//     const searchQuery = {
//         $or: [
//             { title: { $regex: keyword, $options: 'i' } },
//             { category: { $regex: keyword, $options: 'i' } },
//             { brand_namez: { $regex: keyword, $options: 'i' } },
//             { filtercategory: { $regex: keyword, $options: 'i' } },
//             { size: { $regex: keyword, $options: 'i' } },
//         ]
//     };

//     return await AllProduct.find(searchQuery);
// };



module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    // filterProducts,
    // searchProducts
};


