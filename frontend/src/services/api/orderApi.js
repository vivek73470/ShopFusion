import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseApi';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithHeaders,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: '/orders/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { useGetOrdersQuery, useAddOrderMutation, useDeleteOrderMutation } = orderApi;


