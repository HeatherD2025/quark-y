import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "/src/utils/tokenService.js";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api/`, // DOUBLE CHECK THIS
  prepareHeaders: (headers) => {
    const LOCAL_TOKEN = getToken();
    if (LOCAL_TOKEN) {
      headers.set("authorization", `Bearer ${LOCAL_TOKEN}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  tagTypes: [], // common tags here if needed
  endpoints: () => ({}), // empty base endpoints, to be extended
});
