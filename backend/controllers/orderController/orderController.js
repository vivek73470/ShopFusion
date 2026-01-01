const orderService = require('../../services/orderService/orderService');


//  Get all orders
const getAllOrders = async (req, res) => {
    try {
        const data = await orderService.getAllOrders();
        return res.status(200).json({
            status: true,
            message: "Got all orders successfully",
            data: data
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching orders"
        });
    }
};

//  Create a new order
const createOrder = async (req, res) => {
    const { title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText,
        discount_price_box, image, filtercategory, size } = req.body;
    try {
        const orderData = { 
            title, price, description, category, plp, brand_namez, 
            discountedPriceText, actualPriceText, discount_price_box, 
            image, filtercategory, size 
        };
        const data = await orderService.createOrder(orderData);
        return res.status(201).json({
            status: true,
            message: "Order created successfully",
            data: data
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while creating order"
        });
    }
};


//  Delete order
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedOrder = await orderService.deleteOrder(id);
        if (!deletedOrder) {
            return res.status(404).json({
                status: false,
                message: "Order not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Order deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting order:', error);
        return res.status(500).json({ 
            status: false,
            message: "Error while deleting order" 
        });
    }
};

module.exports = {
    getAllOrders,
    createOrder,
    deleteOrder
};


