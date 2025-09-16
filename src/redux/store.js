import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authSlice";
import { scienceNewsApi } from "../features/news/scienceNewsApi";
import { userApi } from "../features/user/userApi";
import { spaceNewsApi } from "../features/news/spaceNewsApi";

const store = configureStore({
  reducer: {
    [scienceNewsApi.reducerPath]: scienceNewsApi.reducer,
    [spaceNewsApi.reducerPath]: spaceNewsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(scienceNewsApi.middleware)
      .concat(spaceNewsApi.middleware)
      .concat(userApi.middleware),
});

export default store;
