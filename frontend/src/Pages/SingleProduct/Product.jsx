import React, { useEffect } from 'react'
import './singleDet.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { addProductCart, getSingleProduct } from '../../Redux/products/action';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer'
import notify from '../../utils/toastNotifications';


function SingleProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const currentProduct = useSelector(store => store.ProductReducer.CurrentProduct)

  useEffect(() => {
    if (id) {
      dispatch(getSingleProduct(id))
    }
  }, [dispatch, id])

  // Before dispatching the addProductCart action, it first checks if there is a currentProduct.
  //  This check ensures that the action is dispatched only if there is a valid product to add to the cart.
  const addToCartHandler = async () => {
    if (currentProduct) {
      const result = await dispatch(addProductCart(currentProduct));
      if (result.status) {
        notify.success("Added to cart Successfully!");
      } else {
        notify.error(result.message || 'An error occurred');
      }
    }
  }


  return (
    <>
      <Navbar />
      <div className='single-product-mainscreen'>
        <div className='single-product-wrapscreen'>
          <div className='prdct-size-mobile' >
            <img src={currentProduct.image} alt='info_image' />
          </div>
          <div className='single-product-details'>
            <p className='single-product-fashion'>{currentProduct.brand_namez}</p>
            <p className='single-product-men'>{currentProduct.title} {currentProduct.filtercategory}</p>
            <div className='single-product-actdiscount'>
              <p className='single-product-discount'>रु.{currentProduct.discountedPriceText}</p>
              <p className='single-product-actual'>{currentProduct.actualPriceText}रु.</p>
              <div className='single-product-off'>
                <p>{currentProduct.discount_price_box}</p>
                <p> %OFF</p>
              </div>
            </div>
            <div className='single-page-inclusive'>
              <p>
                inclusive of all taxes
              </p>
            </div>
            <div className='single-page-details'>
              <div className='single-product-1st'>
                <p>{currentProduct.plp}</p>
              </div>
              <div className='single-product-2nd'>
                <p>DESIGN OF THE DAY</p>

              </div>
            </div>
            <div>
              <p className='single-page-border'></p>
              <p className='single-page-tribe'>TriBe members get an extra discount of ₹{currentProduct.discount_price_box} and FREE shipping.</p>
              <p className='single-page-border'></p>
            </div>
            <div>
              <p className='single-product-select'>Size</p>
              <span className='sixe-stl-cart'>{currentProduct.size}</span>
            </div>
            <div className='single-product-sizeflex'>
            </div>
            <div>
              <p className='single-product-garment'>{currentProduct?.description?.slice(0, 120)}</p>
            </div>
            <div className='single-product-detail-box'>
              <p className='single-product-datail-head' >Product Details</p>
              <div>
                <p className='single-product-brand'>
                  <span style={{ fontWeight: '600' }}>Brand:</span> {currentProduct.brand_namez}
                </p>
                <p className='single-product-brand'>
                  <span style={{ fontWeight: '600' }}>Product Name:</span> {currentProduct.title} {currentProduct.filtercategory}
                </p>
                <p className='single-product-brand'>
                  <span style={{ fontWeight: '600' }}>Product Type:</span> Full Sleeve T-shirt
                </p>

              </div>

            </div>
            <div className='single-product-description'>
              <p className='single-product-datail-head'>Description</p>
              <p>{currentProduct.description}</p>
            </div>
            <button className='single-addto-butn' onClick={addToCartHandler}>Add to Cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SingleProduct