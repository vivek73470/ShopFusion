
import React from "react";
import "./filter.css";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Filter = ({ setController }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    category: searchParams.getAll("category"),
    brand_namez: searchParams.getAll("brand_namez"),
    size: searchParams.getAll("size"),
    filtercategory: searchParams.getAll("filtercategory"),
  });

  const handleCheckboxChange = (key, value, checked) => {
    setFilters((prev) => {
      const updated = checked
        ? [...prev[key], value]
        : prev[key].filter((v) => v !== value);

      return { ...prev, [key]: updated };
    });
  };
  useEffect(() => {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      delete params.search; // remove search when filters applied
      return { ...params, ...filters };
    });

    setController((prev) => ({
      ...prev,
      search: "",
      ...filters,
      offset: 0,
    }));

  }, [filters]);



  const renderCheckbox = (key, value, label = value) => (
    <div className="filter-pdng">
      <input
        type="checkbox"
        value={value}
        checked={filters[key].includes(value)}
        onChange={(e) =>
          handleCheckboxChange(key, value, e.target.checked)
        }
      />
      <label className="filter-label-dgn">{label}</label>
    </div>
  );

  return (
    <div className="filter-categrs">

      <div className="filter-prdc-brdrbtm">
        <h3 className="product-filter-stl">FILTERS</h3>
        {["Boys", "Kids", "Girls"].map((v) =>
          renderCheckbox("category", v)
        )}
      </div>

      <div className="filter-prdc-brdrbtm">
        <h3 className="product-filter-stl">CATEGORIES</h3>
        {[
          "Jeans",
          "Tshirts",
          "Shirts",
          "Tops",
          "Party Wear",
          "Jackets",
          "Trousers",
        ].map((v) => renderCheckbox("filtercategory", v))}
      </div>

      <div className="filter-prdc-brdrbtm">
        <h3 className="product-filter-stl">BRAND</h3>
        {["Roadster", "Friskers", "Wrogn", "Chicco", "Style Cast", "Zara"].map(
          (v) => renderCheckbox("brand_namez", v)
        )}
      </div>

      <div className="filter-prdc-brdrbtm">
        <h3 className="product-filter-stl">SIZE</h3>
        {["2XS", "XS", "S", "M", "L", "XL", "2XL"].map((v) =>
          renderCheckbox("size", v)
        )}
      </div>
    </div>
  );
};

export { Filter };


