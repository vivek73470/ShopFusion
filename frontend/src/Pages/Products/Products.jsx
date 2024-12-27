import React, { } from "react";
import './products.css'
import { Filter } from "../../Components/FilterComponent/FilterComponent"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { fetchData, startLoading, stopLoading } from "../../Redux/products/action";
import Footer from "../../Components/Footer/footer";
import Navbar from "../../Components/Navbar/Navbar";


const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const watches = useSelector((store) => store.ProductReducer.products)

  // useEffect(() => {
  //   dispatch(fetchData())

  // }, [dispatch])
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(startLoading());
      try {
        await dispatch(fetchData());
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchProducts();
  }, [dispatch]);


  return (
    <>
      <Navbar />
      <div className='product-screen'>
        <div className='product-screen-wrapper'>
          <div className='product-screen-wrapper1st'>
            <div className='product-filter'>
              <Filter />
            </div>
            <div className='product-listing'>
              {watches?.length > 0 &&
                watches?.map((item) => (
                  <div className="productlist-design" key={item.id} >
                    <img className='product-imgstyle' src={item.image} alt="cloth products" />
                    <p className='product-brandname'>{item.brand_namez}</p>
                    <p className='product-actual-title'>{item.title} {item.filtercategory}</p>
                    <div className='product-price-description'>
                      <p className='product-discount-price'>₹{item.discountedPriceText}</p>
                      <p className='product-actual-price'>₹{item.actualPriceText}</p>
                    </div>
                    <p className='product-title-members'>₹{item.discount_price_box} For Tribe Members</p>
                    <button className="product-viewdtls-dgn" onClick={() => navigate(`/cartproducts/${item._id}`)}>View details</button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>

  );
};
export default Products