import React, { useCallback, useState } from "react";
import "./search.css";
import { CiSearch } from "react-icons/ci";
import debounce from "lodash.debounce";
import { useNavigate, useLocation } from "react-router-dom";
import { useLazySearchProductsQuery } from "../../services/api/productApi";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [triggerSearch, { data: dropdownResults }] = useLazySearchProductsQuery();

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
      if (searchQuery) {
        triggerSearch(searchQuery);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
        if (location.pathname === "/products") {
          navigate("/products");
        }
      }
    }, 400),
    [location.pathname, navigate, triggerSearch]
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    debounceSearch(value);
  };

  const handleSelectProduct = (product) => {
    const keyword = product.filtercategory || product.title || query;
    setQuery(keyword);
    setShowDropdown(false);
    if (location.pathname !== "/products") {
      navigate(`/products?keyword=${encodeURIComponent(keyword)}`);
    } else {
      navigate(`/products?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <>
      <div className="your-events-searchstyle">
        <span className="span-search-header">
          <CiSearch />
          <input
            type="search"
            className="your-events-searchbox-head"
            placeholder="What are you looking for"
            value={query}
            onChange={handleInputChange}
          />
        </span>
        {showDropdown && query && (
          <ul className="search-results">
            {dropdownResults?.data?.length > 0 ? (
              dropdownResults?.data?.map((product) => (
                <div key={product._id} onClick={() => handleSelectProduct(product)}>
                  <p>{product.filtercategory}</p>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No match found</p>
              </div>
            )}
          </ul>
        )}
      </div>
    </>
  );
}

export default Search;
