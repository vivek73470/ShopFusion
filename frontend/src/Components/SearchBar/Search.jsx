import React, { useCallback,useState } from 'react';
import './search.css';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import {fetchData, fetchSearchData, fetchSearchDropdown } from '../../Redux/products/action';
import debounce from 'lodash.debounce';
import { useNavigate,useLocation } from 'react-router-dom';

function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [query, setQuery] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownResults  = useSelector((store) => store.ProductReducer.dropdownResults );

  const debounceSearch = useCallback(
    debounce((searchQuery) => {
        if (searchQuery) {
            dispatch(fetchSearchDropdown(searchQuery));
            setShowDropdown(true); 
        }else{
            dispatch(fetchData())
        }
    }, 500),
    []
);

    const handleInputChange = (event) => {
        const { value } = event.target;
        setQuery(value);
        debounceSearch(value);
    };
    const handleSelectProduct = (product) => {
        setQuery(product.filtercategory);
        dispatch(fetchSearchData(product.filtercategory));
        setShowDropdown(false); 
        if(location.pathname !== '/products')
            navigate('/products')

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
                        {dropdownResults?.length > 0 ? (
                            dropdownResults?.map((product) => (
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
