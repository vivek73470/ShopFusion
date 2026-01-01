import React from 'react';
import './cartCounter.css';
import { useGetCartQuery } from '../../services/api/cartApi';

function CartCounter() {
  const { data: cartResponse } = useGetCartQuery();
  const cart = cartResponse?.data || [];

  return (
    <>
      <div className='cart-counter-screen'>
        <div className='cart-cnt'>{cart?.length ? cart.length : 0}</div>
      </div>
    </>
  );
}

export default CartCounter;