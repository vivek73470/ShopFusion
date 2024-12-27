import React, { useEffect } from 'react'
import './cartCounter.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../../Redux/products/action';

function CartCounter() {
    const cart = useSelector(store => store.ProductReducer.cart)
    const dispatch = useDispatch();

    useEffect(() => {
        if (cart?.length === 0) {
            dispatch(fetchCart());
        }
    }, [cart?.length, dispatch]);
    return (
        <>
            <div className='cart-counter-screen'>
                <div className='cart-cnt'>
                    {cart?.length ? cart?.length : 0}
                </div>

            </div>
        </>
    )
}

export default CartCounter