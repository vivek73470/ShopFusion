import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseApi';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithHeaders,
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: 'Product', id: _id })),
              { type: 'Products', id: 'LIST' },
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (_, __, id) => [{ type: 'Product', id }],
    }),
    searchProducts: builder.query({
      query: (keyword) => `/products/search-products?keyword=${encodeURIComponent(keyword)}`,
      providesTags: [{ type: 'Products', id: 'LIST' }],
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
      providesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    addProduct: builder.mutation({
      query: (body) => ({
        url: '/products/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Product', id },
        { type: 'Products', id: 'LIST' },
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [
        { type: 'Product', id },
        { type: 'Products', id: 'LIST' },
      ],
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


