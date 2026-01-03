import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseApi';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithHeaders,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products']
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      // providesTags: ['Products']

    }),
    searchProducts: builder.query({
      query: (keyword) => `/products/search-products?keyword=${encodeURIComponent(keyword)}`,
      providesTags: ['Products'],
    }),
    filterProducts: builder.query({
      query: (filters) => {
        const params = new URLSearchParams();
        ['category', 'brand_namez', 'filtercategory', 'size'].forEach((key) => {
          if (filters?.[key]) {
            const values = Array.isArray(filters[key]) ? filters[key] : [filters[key]];
            values.forEach((value) => params.append(key, value));
          }
        });
        const queryString = params.toString();
        return `/products/filter-products${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Products'],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: '/products/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Products']
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useLazySearchProductsQuery,
  useFilterProductsQuery,
  useLazyFilterProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;


