import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { scienceNewsApi } from "../features/news/scienceNewsApi";
import { userApi } from "../features/user/userApi";
import { spaceNewsApi } from "../features/news/spaceNewsApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [scienceNewsApi.reducerPath]: scienceNewsApi.reducer,
    [spaceNewsApi.reducerPath]: spaceNewsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(scienceNewsApi.middleware)
      .concat(spaceNewsApi.middleware)
      .concat(userApi.middleware),
});

export default store;
