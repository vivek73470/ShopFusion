import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseApi';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: baseQueryWithHeaders,
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    sendContact: builder.mutation({
      query: (body) => ({
        url: '/contact/send',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSendContactMutation } = contactApi;


