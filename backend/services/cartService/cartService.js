const AllCart = require('../../model/cartModel/cartmodel');


//  Get all cart items
const getAllCartItems = async () => {
    return await AllCart.find();
};


//  Get cart item by ID
const getCartItemById = async (id) => {
    return await AllCart.findById(id);
};


//  Create a new cart item
const createCartItem = async (cartData) => {
    const newCartItem = new AllCart(cartData);
    return await newCartItem.save();
};


//  * Delete cart item by ID
const deleteCartItem = async (id) => {
    return await AllCart.findByIdAndDelete({ _id: id });
};

module.exports = {
    getAllCartItems,
    getCartItemById,
    createCartItem,
    deleteCartItem
};


