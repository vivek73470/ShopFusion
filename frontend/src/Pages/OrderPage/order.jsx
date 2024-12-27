import React, { useEffect } from 'react';
import './order.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderProducts, fetchOrder } from '../../Redux/products/action';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer';
import notify from '../../utils/toastNotifications';

function Order() {
    const dispatch = useDispatch();
    const orders = useSelector((store) => store.ProductReducer.orders);



    useEffect(() => {
        dispatch(fetchOrder());
    }, [dispatch]);

    const removeOrder = async (id) => {
        const result = await dispatch(deleteOrderProducts(id))
        if (result.status) {
            notify.success(result.message || 'order cancel successfully');

        } else {
            notify.error(result.message || 'Error while cancel order');
        }
    }

    return (
        <>
            <Navbar />
            <div className='orderpage-container'>
                <div className='orderpage-wrapper'>
                    <h2>Your Orders</h2>
                    {orders?.length > 0 ? (
                        <div className='order-scroll style-4'>
                            {orders?.length > 0 &&
                                orders?.map((elem, index) => (
                                    <div key={index}>
                                        <div className=''>
                                            <div className='orders-degn-flx '>
                                                <div className='cartitm-bdrord-ims'>
                                                    <img src={elem.image} alt="" />
                                                </div>
                                                <div className='cartitm-bdrord'>
                                                    <h2 className='brnad-titl-crtor' >{elem.brand_namez}</h2>
                                                    <h2 className='abt-crt-h2orig'>{elem.title}-{elem.filtercategory}</h2>
                                                    <p className='cart-desript-orig'>{elem.description}</p>
                                                    <div style={{ paddingBottom: '25px', textAlign: 'left' }}>
                                                        <span className='cart-add-price'>रु.{elem.price}</span>
                                                    </div>
                                                    <button onClick={() => removeOrder(elem._id)} className='rmv-btn'>Cancel Order  </button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <p className='cart-nothing-item'>Nothing in your orders list.</p>
                    )}

                </div>
            </div>
            <Footer />
        </>
    );
}

export default Order;
