import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;

export const scienceNewsApi = createApi({
  reducerPath: 'scienceNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
  }),
  endpoints: (builder) => ({
    getScienceArticles: builder.query({
      query: ({ page = 1, pageSize = 10} = {}) =>
        `everything?q=physics+OR+space+OR+astrophysics&language=en&page=${page}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`,
    }),
  }),
});

export const { useGetScienceArticlesQuery } = scienceNewsApi;
