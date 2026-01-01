import React from 'react';
import './singleDet.css';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/footer';
import notify from '../../utils/toastNotifications';
import { useAddToCartMutation, useGetCartQuery } from '../../services/api/cartApi';
import { useGetProductByIdQuery } from '../../services/api/productApi';
import CircularProgress from '@mui/material/CircularProgress';

function SingleProduct() {
  const { id } = useParams();
  useGetCartQuery(); // keep cart counter in sync
  const { data: productResponse, isFetching } = useGetProductByIdQuery(id, { skip: !id });
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const currentProduct = productResponse?.data || {};

  const addToCartHandler = async () => {
    if (!currentProduct?._id) return;
    try {
      const result = await addToCart(currentProduct).unwrap();
      if (result?.status) {
        notify.success('Added to cart Successfully!');
      } else {
        notify.error(result?.message || 'An error occurred');
      }
    } catch (error) {
      notify.error(error?.data?.message || 'An error occurred');
    }
  };

  return (
    <>
      <Navbar />
      <div className='single-product-mainscreen'>
        <div className='single-product-wrapscreen'>
          <div className='prdct-size-mobile'>
            {isFetching ? (
              <div className='products-loader-single'>
                <CircularProgress size={28} />
              </div>
            ) : (
              <img src={currentProduct.image} alt='info_image' />
            )}
          </div>
          <div className='single-product-details'>
            <p className='single-product-fashion'>{currentProduct.brand_namez}</p>
            <p className='single-product-men'>
              {currentProduct.title} {currentProduct.filtercategory}
            </p>
            <div className='single-product-actdiscount'>
              <p className='single-product-discount'>रु.{currentProduct.discountedPriceText}</p>
              <p className='single-product-actual'>{currentProduct.actualPriceText}रु.</p>
              <div className='single-product-off'>
                <p>{currentProduct.discount_price_box}</p>
                <p> %OFF</p>
              </div>
            </div>
            <div className='single-page-inclusive'>
              <p>inclusive of all taxes</p>
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
              <p className='single-page-tribe'>
                TriBe members get an extra discount of ₹{currentProduct.discount_price_box} and FREE
                shipping.
              </p>
              <p className='single-page-border'></p>
            </div>
            <div>
              <p className='single-product-select'>Size</p>
              <span className='sixe-stl-cart'>{currentProduct.size}</span>
            </div>
            <div className='single-product-sizeflex'></div>
            <div>
              <p className='single-product-garment'>{currentProduct?.description?.slice(0, 120)}</p>
            </div>
            <div className='single-product-detail-box'>
              <p className='single-product-datail-head'>Product Details</p>
              <div>
                <p className='single-product-brand'>
                  <span style={{ fontWeight: '600' }}>Brand:</span> {currentProduct.brand_namez}
                </p>
                <p className='single-product-brand'>
                  <span style={{ fontWeight: '600' }}>Product Name:</span> {currentProduct.title}{' '}
                  {currentProduct.filtercategory}
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
            <button className='single-addto-butn' onClick={addToCartHandler} disabled={isAdding}>
              {isAdding ? <CircularProgress size={18} /> : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleProduct;