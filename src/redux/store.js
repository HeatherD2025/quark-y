import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import newsReducer from "./slices/newsSlice";
import { userApi } from "../api/userApi";
import { scienceNewsApi } from "../api/scienceNewsApi";

const store = configureStore({
  reducer: {
    user: userReducer,
    news: newsReducer,
    [userApi.reducerPath]: userApi.reducer,
    [scienceNewsApi.reducerPath]: scienceNewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
     .concat(userApi.middleware)
     .concat(scienceNewsApi.middleware),
});

export default store;