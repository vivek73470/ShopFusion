const Allorder = require('../../model/order/ordermodel');


//  Get all orders
const getAllOrders = async () => {
    return await Allorder.find();
};


//  Get order by ID
const getOrderById = async (id) => {
    return await Allorder.findById(id);
};


// Create a new order
const createOrder = async (orderData) => {
    const newOrder = new Allorder(orderData);
    return await newOrder.save();
};


// Delete order by ID
const deleteOrder = async (id) => {
    return await Allorder.findByIdAndDelete({ _id: id });
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrder
};


