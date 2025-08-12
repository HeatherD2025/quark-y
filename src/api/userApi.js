import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../utils/tokenService';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token || getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
        }),
        saveArticle: builder.mutation({
            query: (article) => ({
                url: '/auth/saved',
                method: 'POST',
                body: article,
            }),
        }),
    }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSaveArticleMutation,
} = userApi;