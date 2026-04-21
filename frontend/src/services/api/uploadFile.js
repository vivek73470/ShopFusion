import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithHeaders } from './baseApi';

export const uploadApi = createApi({
  reducerPath: 'uploadApi',
  baseQuery: baseQueryWithHeaders,
  endpoints: (builder) => ({

    uploadImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append('image', file);

        return {
          url: '/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),

  }),
});

export const { useUploadImageMutation } = uploadApi;