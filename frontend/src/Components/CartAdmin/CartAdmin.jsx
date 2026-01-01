import React from 'react'
import './cartAdmin.css'
import { MdDelete } from "react-icons/md";
import { useGetCartQuery, useRemoveFromCartMutation } from '../../services/api/cartApi';
import notify from '../../utils/toastNotifications';


function CartAdmin() {
    const { data: cartData, isLoading } = useGetCartQuery();
    const [removeFromCart] = useRemoveFromCartMutation();
    const cart = cartData?.data || [];

    const removeProduct = async(id) => {
        try {
            const result = await removeFromCart(id).unwrap();
            if(result.status) { 
                notify.success(result.message || 'Removed successfully');
            } else {
                notify.error(result.message || 'Error while removing product');
            }
        } catch (error) {
            notify.error(error?.data?.message || 'Error while removing product');
        }
    };

    return (
        <>
        <div className='cartadmin-container'>
            <div className='cartadmin-container-ttl'>Total Product in Carts : {cart?.length}</div>
            <div className='cart-adminborder'></div>
        <div className='cartadmin-wrapper'>
            {cart?.length > 0 && cart?.map((item, index) => (
                    <div  key={index} className='ordersaadmin-degn-flx'>
                        <div className='cartitmadmin-bdr-ims'>
                            <img src={item.image} alt="" />
                        </div>
                        <div className='cartitmadmin-bdr'>
                            <h4>{item.title}</h4>
                            <p className='orderadmin-description'>{item.description}</p>
                            <p className='cartadmin-add-price-order'>रु.{item.price}</p>
                            <button onClick={() => removeProduct(item._id)} className='rmv-btn-admin'>
                <MdDelete />   Remove  </button>
                        </div>
                    </div>
            ))}
        </div>
        </div>
    </>
    )
}

export default CartAdmin