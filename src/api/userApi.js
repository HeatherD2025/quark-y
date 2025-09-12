import { createApi } from '@reduxjs/toolkit/query/react';
import {  baseQuery } from './api';
import { getToken } from '../utils/tokenService';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery,
    tagTypes: ['User'],
    endpoints: (builder) => ({

        register: builder.mutation({
            query: ({ username, email, password, avatar }) => ({
                url: '/auth/register',
                method: 'POST',
                body: { username, email, password, avatar },
            }),
        }),

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

        getMe: builder.query({
            query: () => '/users/me',
            provideTags: ['User'],
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
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useSaveArticleMutation,
} = userApi;