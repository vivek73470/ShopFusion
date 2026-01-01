import React from "react";
import "./filter.css";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Filter = ({ onFilterChange }) => {
  const [searchParams, setSerchparams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.getAll("category") || []);
  const [brand_namez, setBrandNamez] = useState(searchParams.getAll("brand_namez") || []);
  const [size, setSize] = useState(searchParams.getAll("size") || []);
  const [filtercategory, setfiltercategory] = useState(searchParams.getAll("filtercategory") || []);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    let updatedCategories = [...category];

    if (checked) {
      updatedCategories.push(value);
    } else {
      updatedCategories = updatedCategories.filter(cat => cat !== value);
    }
    setCategory(updatedCategories);

    // dispatch(fetchFilterData(updatedCategories));
  };


  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    let updatedBrands = [...brand_namez];

    if (checked) {
      updatedBrands.push(value);
    } else {
      updatedBrands = updatedBrands.filter(brand => brand !== value);
    }
    setBrandNamez(updatedBrands);
    // dispatch(fetchFilterData(updatedBrands));
  };


  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let updatedSize = [...size];

    if (checked) {
      updatedSize.push(value);
    } else {
      updatedSize = updatedSize.filter(size => size !== value);
    }
    setSize(updatedSize);
    // dispatch(fetchFilterData(updatedBrands));
  };

  const handlefiltercategoryChange = (e) => {
    const { value, checked } = e.target;
    let updatedfiltercategory = [...filtercategory];

    if (checked) {
      updatedfiltercategory.push(value);
    } else {
      updatedfiltercategory = updatedfiltercategory.filter(filtercategory => filtercategory !== value);
    }
    setfiltercategory(updatedfiltercategory);
   
  };

  useEffect(() => {
    const params = { category, brand_namez, size, filtercategory };
    setSerchparams(params);
    onFilterChange?.(params);
  }, [category, brand_namez, size, filtercategory, setSerchparams, onFilterChange]);


  return (
    <div className="filter-categrs">
      <div className="filter-prdc-brdrbtm">
        <h3 className="product-filter-stl">FILTERS</h3>
        <div className="filter-category">
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Boys"
              checked={category.includes("Boys")}
              onChange={handleChange} />
            <label className="filter-label-dgn">Boys</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Kids"
              checked={category.includes("Kids")}
              onChange={handleChange} />
            <label className="filter-label-dgn">kids</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Girls"
              checked={category.includes("Girls")}
              onChange={handleChange}
            />
            <label className="filter-label-dgn">Girls</label>
          </div>
        </div>
      </div>


      <div className="filter-prdc-brdrbtm">
        <h3 className="product-filter-stl">CATEGORIES</h3>
        <div className="filter-category">
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Jeans"
              checked={filtercategory.includes("Jeans")}
              onChange={handlefiltercategoryChange} />
            <label className="filter-label-dgn">Jeans</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Tshirts"
              checked={filtercategory.includes("Tshirts")}
              onChange={handlefiltercategoryChange} />
            <label className="filter-label-dgn">Tshirts</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Shirts"
              checked={filtercategory.includes("Shirts")}
              onChange={handlefiltercategoryChange} />
            <label className="filter-label-dgn">Shirts</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Tops"
              checked={filtercategory.includes("Tops")}
              onChange={handlefiltercategoryChange} />
            <label className="filter-label-dgn">Tops</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Party Wear"
              checked={filtercategory.includes("Party Wear")}
              onChange={handlefiltercategoryChange} />
            <label className="filter-label-dgn">Party Wear</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Jackets"
              checked={filtercategory.includes("Jackets")}
              onChange={handlefiltercategoryChange} />
            <label className="filter-label-dgn">Jackets</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Trousers"
              checked={filtercategory.includes("Trousers")}
              onChange={handlefiltercategoryChange} />
            <label className="filter-label-dgn">Trousers</label>
          </div>
        </div>
      </div>


      <div className="filter-prdc-brdrbtm">
        <h3 className="product-filter-stl">BRAND</h3>
        <div className="filter-category">
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Roadster"
              checked={brand_namez.includes("Roadster")}
              onChange={handleBrandChange} />
            <label className="filter-label-dgn">Roadster</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Friskers"
              checked={brand_namez.includes("Friskers")}
              onChange={handleBrandChange} />
            <label className="filter-label-dgn">Friskers</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Wrogn"
              checked={brand_namez.includes("Wrogn")}
              onChange={handleBrandChange} />
            <label className="filter-label-dgn">Wrogn</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Chicco"
              checked={brand_namez.includes("Chicco")}
              onChange={handleBrandChange} />
            <label className="filter-label-dgn">Chicco</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Style Cast"
              checked={brand_namez.includes("Style Cast")}
              onChange={handleBrandChange} />
            <label className="filter-label-dgn">Style Cast</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="Zara"
              checked={brand_namez.includes("Zara")}
              onChange={handleBrandChange} />
            <label className="filter-label-dgn">Zara</label>
          </div>
        </div>
      </div>

      <div className="filter-prdc-brdrbtm">
        <h3 className="product-filter-stl">SIZE</h3>
        <div className="filter-category">
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="2XS"
              checked={size.includes("2XS")}
              onChange={handleSizeChange} />
            <label className="filter-label-dgn">2XS</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="XS"
              checked={size.includes("XS")}
              onChange={handleSizeChange} />
            <label className="filter-label-dgn">XS</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="S"
              checked={size.includes("S")}
              onChange={handleSizeChange} />
            <label className="filter-label-dgn">S</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="M"
              checked={size.includes("M")}
              onChange={handleSizeChange} />
            <label className="filter-label-dgn">M</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="L"
              checked={size.includes("L")}
              onChange={handleSizeChange} />
            <label className="filter-label-dgn">L</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="XL"
              checked={size.includes("XL")}
              onChange={handleSizeChange} />
            <label className="filter-label-dgn">XL</label>
          </div>
          <div className="filter-pdng">
            <input type="checkbox"
              id="filtr-chck"
              value="2XL"
              checked={size.includes("2XL")}
              onChange={handleSizeChange} />
            <label className="filter-label-dgn">2XL</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Filter }
