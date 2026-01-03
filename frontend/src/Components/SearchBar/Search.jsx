
import React, {useState } from "react";
import "./search.css";
import { CiSearch } from "react-icons/ci";
import { useNavigate, useSearchParams } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  const handleFocus = () => {
    navigate("/products", { replace: true });
  };

  const handleSearch = (value) => {
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

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
