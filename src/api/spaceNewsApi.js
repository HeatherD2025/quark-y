import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spaceNewsApi = createApi({
  reducerPath: 'spaceNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spaceflightnewsapi.net/v4/',
  }),
  endpoints: (builder) => ({
    getSpaceArticles: builder.query({
    query: ({ page = 1, pageSize = 10 } = {}) => 
      `articles?_limit=${pageSize}&offset=${(page - 1) * pageSize}&ordering=-published_at`,
    }),
  }),
});

export const { useGetSpaceArticlesQuery } = spaceNewsApi;