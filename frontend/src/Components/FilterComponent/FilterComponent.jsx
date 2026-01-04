
import React from "react";
import "./filter.css";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.getAll("category"),
    brand_namez: searchParams.getAll("brand_namez"),
    size: searchParams.getAll("size"),
    filtercategory: searchParams.getAll("filtercategory"),
  });

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setFilters({
        category: [],
        brand_namez: [],
        size: [],
        filtercategory: [],
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const params = {};

    if (filters.category.length) params.category = filters.category;
    if (filters.brand_namez.length) params.brand_namez = filters.brand_namez;
    if (filters.size.length) params.size = filters.size;
    if (filters.filtercategory.length)
      params.filtercategory = filters.filtercategory;

    // Only update if there are actual filter changes
    const hasFilters = Object.keys(params).length > 0;
    const currentSearch = searchParams.get("search");

    if (hasFilters || !currentSearch) {
      setSearchParams(params);
    }
  }, [filters, searchParams]);

  const handleCheckboxChange = (key, value, checked) => {
    setFilters((prev) => {
      const updated = checked
        ? [...prev[key], value]
        : prev[key].filter((v) => v !== value);

      return { ...prev, [key]: updated };
    });
  };

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


