import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const spaceNewsApi = createApi({
  reducerPath: 'spaceeNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.spaceflightnewsapi.net/v4/',
  }),
  endpoints: (builder) => ({
    getSpaceArticles: builder.query({
      query: () =>
        'articles?_limit=50&_sort=publishedAt:desc',
    }),
  }),
});

export const { useGetSpaceArticlesQuery } = spaceNewsApi;