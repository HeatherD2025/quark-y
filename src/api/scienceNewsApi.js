import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const scienceNewsApi = createApi({
  reducerPath: 'scienceNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
  }),
  endpoints: (builder) => ({
    getScienceArticles: builder.query({
      query: () =>
        `everything?q=physics+OR+space+OR+astrophysics&language=en&pageSize=50&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`,
    }),
  }),
});

export const { useGetScienceArticlesQuery } = scienceNewsApi;
