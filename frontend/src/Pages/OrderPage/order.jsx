import React from 'react';
import './order.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer';
import notify from '../../utils/toastNotifications';
import { useDeleteOrderMutation, useGetOrdersQuery } from '../../services/api/orderApi';
import CircularProgress from '@mui/material/CircularProgress';

function Order() {
  const { data: ordersResponse, isFetching } = useGetOrdersQuery();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const orders = ordersResponse?.data || [];

  const removeOrder = async (id) => {
    try {
      const result = await deleteOrder(id).unwrap();
      if (result?.status) {
        notify.success(result?.message || 'Order cancelled successfully');
      } else {
        notify.error(result?.message || 'Error while cancel order');
      }
    } catch (error) {
      notify.error(error?.data?.message || 'Error while cancel order');
    }
  };

  return (
    <>
      <Navbar />
      <div className='orderpage-container'>
        <div className='orderpage-wrapper'>
          <h2>Your Orders</h2>
          {isFetching && (
            <div className='products-loader'>
              <CircularProgress size={24} />
            </div>
          )}
          {!isFetching && orders?.length > 0 ? (
            <div className='order-scroll style-4'>
              {orders?.map((elem, index) => (
                <div key={index}>
                  <div className=''>
                    <div className='orders-degn-flx '>
                      <div className='cartitm-bdrord-ims'>
                        <img src={elem.image} alt='' />
                      </div>
                      <div className='cartitm-bdrord'>
                        <h2 className='brnad-titl-crtor'>{elem.brand_namez}</h2>
                        <h2 className='abt-crt-h2orig'>
                          {elem.title}-{elem.filtercategory}
                        </h2>
                        <p className='cart-desript-orig'>{elem.description}</p>
                        <div style={{ paddingBottom: '25px', textAlign: 'left' }}>
                          <span className='cart-add-price'>रु.{elem.price}</span>
                        </div>
                        <button
                          onClick={() => removeOrder(elem._id)}
                          className='rmv-btn'
                          disabled={isDeleting}
                        >
                          {isDeleting ? <CircularProgress size={16} /> : 'Cancel Order'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !isFetching && <p className='cart-nothing-item'>Nothing in your orders list.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Order;
