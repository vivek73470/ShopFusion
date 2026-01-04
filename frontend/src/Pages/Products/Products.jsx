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
import Pagination from "../../Components/Pagination/Pagination";
import NoRecordsFound from "../../Components/NoRecordFound/NoRecordFound";

const LIMIT = 12;

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  // reset page when search or filters change
  useEffect(() => {
    setPage(1);
  }, [searchParams.toString()]);

  const offset = (page - 1) * LIMIT;
  const queryParams = React.useMemo(() => ({
    limit: LIMIT,
    offset,
    ...(searchParams.get("search") && { search: searchParams.get("search") }),
    ...(searchParams.getAll("category").length && { category: searchParams.getAll("category") }),
    ...(searchParams.getAll("brand_namez").length && { brand_namez: searchParams.getAll("brand_namez") }),
    ...(searchParams.getAll("size").length && { size: searchParams.getAll("size") }),
    ...(searchParams.getAll("filtercategory").length && { filtercategory: searchParams.getAll("filtercategory") }),
  }), [searchParams, offset]);

  const { data, isFetching } = useGetProductsQuery(queryParams);

  const products = data?.data || [];
  const total = data?.total || 0;

  return (
    <>
      <Navbar />
      <div className="product-screen">
        <div className="product-screen-wrapper">
          <div className="product-screen-wrapper1st">
            <div className="product-filter">
              <Filter />
            </div>
            <div className="product-listing" style={{margin: (products?.length === 0 || isFetching) ? 'auto' : ''}}>
              {isFetching && (
                <div className="products-loader-main">
                  <CircularProgress size={28} />
                </div>
              )}

              {!isFetching && products.length === 0 && (
                <NoRecordsFound
                  message="No products found"
                  subText={`We couldn't find any results for ${searchParams}`}
                />
              )}

              {!isFetching &&
                products?.map((item) => (
                  <div className="productlist-design" key={item._id}>
                    <div className='product-imageHeight-adjust'>
                      <img
                        className="product-imgstyle"
                        src={item.image}
                        alt="cloth products"
                      />
                    </div>

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
      {!isFetching && (
        <Pagination
          total={total}
          limit={LIMIT}
          page={page}
          onPageChange={setPage}
        />
      )}
      <Footer />
    </>
  );
};
export default Products;