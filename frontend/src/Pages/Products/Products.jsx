import React, { useEffect, useMemo, useState } from "react";
import "./products.css";
import { Filter } from "../../Components/FilterComponent/FilterComponent";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../Components/Footer/footer";
import Navbar from "../../Components/Navbar/Navbar";
import {
  useGetProductsQuery,
  useLazyFilterProductsQuery,
  useLazySearchProductsQuery,
} from "../../services/api/productApi";
import CircularProgress from "@mui/material/CircularProgress";

const Products = () => {
  const navigate = useNavigate();
  const { data: productsResponse, isLoading: isProductsLoading } = useGetProductsQuery();
  const [triggerFilter, { data: filteredResponse, isFetching: isFiltering }] =
    useLazyFilterProductsQuery();
  const [triggerSearch, { data: searchResponse, isFetching: isSearching }] =
    useLazySearchProductsQuery();
  const [filters, setFilters] = useState({
    category: [],
    brand_namez: [],
    size: [],
    filtercategory: [],
  });
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const hasFilters = useMemo(
    () =>
      Object.values(filters).some(
        (value) => Array.isArray(value) && value.length > 0
      ),
    [filters]
  );

  useEffect(() => {
    if (hasFilters) {
      triggerFilter(filters);
    } else if (keyword) {
      triggerSearch(keyword);
    }
  }, [filters, hasFilters, keyword, triggerFilter, triggerSearch]);

  const products = useMemo(() => {
    if (hasFilters) {
      return filteredResponse?.data || [];
    }
    if (keyword) {
      return searchResponse?.data || [];
    }
    return productsResponse?.data || [];
  }, [filteredResponse?.data, hasFilters, keyword, productsResponse?.data, searchResponse?.data]);

  return (
    <>
      <Navbar />
      <div className="product-screen">
        <div className="product-screen-wrapper">
          <div className="product-screen-wrapper1st">
            <div className="product-filter">
              <Filter onFilterChange={setFilters} />
            </div>
            <div className="product-listing">
              {(isProductsLoading || isFiltering || isSearching) && (
                <div className="products-loader">
                  <CircularProgress size={28} />
                </div>
              )}
              {!isProductsLoading &&
                !isFiltering &&
                !isSearching &&
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