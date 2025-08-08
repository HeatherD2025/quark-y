import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spaceNewsApi = createApi({
  reducerPath: 'spaceNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spaceflightnewsapi.net/v4/',
  }),
  endpoints: (builder) => ({
    getSpaceArticles: builder.query({
      query: () =>
        'articles?limit=50&ordering=-published_at',
    }),
  }),
});

export const { useGetSpaceArticlesQuery } = spaceNewsApi;