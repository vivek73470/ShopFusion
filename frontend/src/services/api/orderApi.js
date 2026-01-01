import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseApi';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: baseQueryWithHeaders,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    addOrder: builder.mutation({
      query: (body) => ({
        url: '/orders/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
  }),
});

export const { useGetOrdersQuery, useAddOrderMutation, useDeleteOrderMutation } = orderApi;


