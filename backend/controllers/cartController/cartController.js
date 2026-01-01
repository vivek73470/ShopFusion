const cartService = require('../../services/cartService/cartService');


//   Get all cart items

const getAllCartItems = async (req, res) => {
    try {
        const data = await cartService.getAllCartItems();
        return res.status(200).json({
            status: true,
            message: "Got all cart products successfully",
            data: data
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while fetching cart products"
        });
    }
};


//  Add item to cart
const addToCart = async (req, res) => {
    const { title, price, description, category, plp, brand_namez, discountedPriceText, actualPriceText,
        discount_price_box, image, filtercategory, size } = req.body;
    try {
        const cartData = { 
            title, price, description, category, plp, brand_namez, 
            discountedPriceText, actualPriceText, discount_price_box, 
            image, filtercategory, size 
        };
        const data = await cartService.createCartItem(cartData);
        return res.status(201).json({
            status: true,
            message: "Product added to cart successfully",
            data: data
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while adding products to cart"
        });
    }
};


//   Delete cart item

const deleteCartItem = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedItem = await cartService.deleteCartItem(id);
        if (!deletedItem) {
            return res.status(404).json({
                status: false,
                message: "Cart item not found"
            });
        }
        return res.status(200).json({
            status: true,
            message: "Cart item deleted successfully"
        });
    } catch (error) {
        console.error('Error deleting cart item:', error);
        return res.status(500).json({ 
            status: false,
            message: "Error while deleting cart item" 
        });
    }
};

module.exports = {
    getAllCartItems,
    addToCart,
    deleteCartItem
};


