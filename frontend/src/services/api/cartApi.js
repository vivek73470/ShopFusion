import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseApi';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithHeaders,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: '/cart/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi;


