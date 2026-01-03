import React, { useEffect, useState } from "react";
import "./products.css";
import { Filter } from "../../Components/FilterComponent/FilterComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer/footer";
import Navbar from "../../Components/Navbar/Navbar";
import {
  useGetProductsQuery,
} from "../../services/api/productApi";
import CircularProgress from "@mui/material/CircularProgress";

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [controller, setController] = useState({
    search: "",
    category: [],
    brand_namez: [],
    size: [],
    filtercategory: [],
    offset: 0,
    limit: 20,
  });

  useEffect(() => {
    setController({
      search: search,
      category: [],
      brand_namez: [],
      size: [],
      filtercategory: [],
      offset: 0,
      limit: 20,
    });
  }, [search]);

  const { data, isFetching } = useGetProductsQuery({
    limit: controller.limit,
    offset: controller.offset,

    ...(controller.search && { search: controller.search }),
    ...(controller.category?.length && { category: controller.category }),
    ...(controller.brand_namez?.length && { brand_namez: controller.brand_namez }),
    ...(controller.size?.length && { size: controller.size }),
    ...(controller.filtercategory?.length && {
      filtercategory: controller.filtercategory,
    }),
  },
  )

  const products = data?.data || [];

  return (
    <>
      <Navbar />
      <div className="product-screen">
        <div className="product-screen-wrapper">
          <div className="product-screen-wrapper1st">
            <div className="product-filter">
              <Filter setController={setController}  />
            </div>
            <div className="product-listing">
              {isFetching && (
                <div className="products-loader-main">
                  <CircularProgress size={28} />
                </div>
              )}

              {!isFetching && products.length === 0 && (
                <p>No data found for your search</p>
              )}

              {!isFetching &&
                products?.map((item) => (
                  <div className="productlist-design" key={item._id}>
                    <img
                      className="product-imgstyle"
                      src={item.image}
                      alt="cloth products"
                    />
                    <p className="product-brandname">{item.brand_namez}</p>
                    <p className="product-actual-title">
                      {item.title} {item.filtercategory}
                    </p>
                    <div className="product-price-description">
                      <p className="product-discount-price">
                        ₹{item.discountedPriceText}
                      </p>
                      <p className="product-actual-price">₹{item.actualPriceText}</p>
                    </div>
                    <p className="product-title-members">
                      ₹{item.discount_price_box} For Tribe Members
                    </p>
                    <button
                      className="product-viewdtls-dgn"
                      onClick={() => navigate(`/cartproducts/${item._id}`)}
                    >
                      View details
                    </button>
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
export default Products;