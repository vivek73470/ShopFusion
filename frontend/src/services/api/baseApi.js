import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_SERVER_URL;

export const baseQueryWithHeaders = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { endpoint }) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers.set('Authorization', token);
    }

    //  Only set JSON header when NOT uploading file
    if (endpoint !== 'uploadImage') {
      headers.set('Content-Type', 'application/json');
    }

    return headers;
  },
});