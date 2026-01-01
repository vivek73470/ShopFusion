import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseApi';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithHeaders,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: '/user/login',
        method: 'POST',
        body,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: '/user/register',
        method: 'POST',
        body,
      }),
    }),
    getUserById: builder.query({
      query: (id) => `/user/${id}`,
      providesTags: (_, __, id) => [{ type: 'User', id }],
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'User', id }],
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: '/user/forgot-password',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/reset-password/${id}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userApi;


