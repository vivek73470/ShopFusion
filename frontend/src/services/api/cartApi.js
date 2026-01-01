import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseApi';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: baseQueryWithHeaders,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '/cart',
      providesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: '/cart/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
    removeFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }],
    }),
  }),
});

export const { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation } = cartApi;


