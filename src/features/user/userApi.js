import { api } from "../api/baseApi";

export const userApi = api.injectEndpoints({
  reducerPath: "userApi",
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ username, email, password, avatarId }) => ({
        url: "/auth/register",
        method: "POST",
        body: { username, email, password, avatarId },
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    editProfile: builder.mutation({
      query: (updatedData) => ({
        url: "/users/me",
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["User"],
    }),

    getMe: builder.query({
      query: () => "/users/me",
      providesTags: ["User"],
    }),

    // saveArticle: builder.mutation({
    //   query: (article) => ({
    //     url: "/auth/saved",
    //     method: "POST",
    //     body: article,
    //   }),
    // }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useEditProfileMutation,
  // useSaveArticleMutation,
} = userApi;
