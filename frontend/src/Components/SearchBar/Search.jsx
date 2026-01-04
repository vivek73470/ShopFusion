
import React, { useState,useEffect } from "react";
import "./search.css";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useSearchParams } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
   const debounceTimeout = React.useRef(null);

  const handleFocus = () => {
    navigate("/products", { replace: true });
  };

  useEffect(() => {
    const hasFilters =
      searchParams.getAll("category")?.length ||
      searchParams.getAll("brand_namez")?.length ||
      searchParams.getAll("size")?.length ||
      searchParams.getAll("filtercategory")?.length;

    if (hasFilters) {
      setQuery("");
    }
  }, [searchParams]);

  const handleSearch = (value) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.trim()) {
        setSearchParams({ search: value });
      } else {
        setSearchParams({});
      }
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div className="your-events-searchstyle">
      <span className="span-search-header">
        <CiSearch />
        <input
          type="search"
          className="your-events-searchbox-head"
          placeholder="What are you looking for"
          value={query}
          onFocus={handleFocus}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            handleSearch(value);
          }}
        />
      </span>
    </div>
  );
}

export default Search;
