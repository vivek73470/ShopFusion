import React from 'react';
import './cart.css';
import { MdDelete } from 'react-icons/md';
import Checkout from '../../Components/Checkout/Checkout';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer';
import notify from '../../utils/toastNotifications';
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from '../../services/api/cartApi';
import { useAddOrderMutation } from '../../services/api/orderApi';
import CircularProgress from '@mui/material/CircularProgress';

function Cart() {
  const { data: cartResponse, refetch } = useGetCartQuery();
  const cart = cartResponse?.data || [];
  const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  const [addOrder, { isLoading: isOrdering }] = useAddOrderMutation();

  const removeProduct = async (id) => {
    try {
      const result = await removeFromCart(id).unwrap();
      if (result?.status) {
        notify.success(result?.message || 'Removed successfully');
      } else {
        notify.error(result?.message || 'Error while removing product');
      }
    } catch (error) {
      notify.error(error?.data?.message || 'Error while removing product');
    }
  };

  const checkoutHandler = async () => {
    try {
      for (const item of cart) {
        const response = await addOrder({ ...item, cartId: item._id }).unwrap();
        if (response?.status === true || response === 200) {
          notify.success(`Order for ${item.title} added successfully!`);
          refetch();
        } else {
          notify.error(`Failed to add order for ${item.title}.`);
        }
      }
    } catch (error) {
      if (error?.status === 401) {
        notify.error('Please login first to place an order.');
        return;
      }
      notify.error('An error occurred during the checkout process.');
    }
  };

  return (
    <>
      <Navbar />
      <div className='cart-design-screen'>
        <h2 className='cart-shopping-crt'>Shopping Cart</h2>
        {cart?.length > 0 ? (
          <div className='cart-headinf style-4'>
            {cart?.map((product) => (
              <CartItem
                key={product._id}
                _id={product._id}
                title={product.title}
                filtercategory={product.filtercategory}
                brand_namez={product.brand_namez}
                price={product.price}
                description={product.description}
                image={product.image}
                removeProduct={removeProduct}
                isRemoving={isRemoving}
              />
            ))}
          </div>
        ) : (
          <p className='cart-nothing-item'>You have zero items in your cart.</p>
        )}
        <Checkout
          cart={cart}
          checkoutHandler={checkoutHandler}
          isLoading={isOrdering || isRemoving}
        />
      </div>
      <Footer />
    </>
  );
}

function CartItem({ _id, title, image, description, price, filtercategory, removeProduct, brand_namez, isRemoving }) {
  return (
    <>
      <div className='cart-container'>
        <div className='cart-scrn-bdr'>
          <div className='cart-brdr'>
            <div className='cartitm-bdr-ims'>
              <img src={image} alt='' />
            </div>
            <div className='cartitm-bdr'>
              <h2 className='brnad-titl-crtor'>{brand_namez}</h2>
              <h2 className='abt-crt-h2orig'>
                {title}-{filtercategory}
              </h2>
              <p className='cart-desript-orig'>{description}</p>
              <div style={{ paddingBottom: '25px', textAlign: 'left' }}>
                <span className='cart-add-price'>रु.{price}</span>
              </div>
              <button onClick={() => removeProduct(_id)} className='rmv-btn' disabled={isRemoving}>
                {isRemoving ? <CircularProgress size={16} /> : <MdDelete />} Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;