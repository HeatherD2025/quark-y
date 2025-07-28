import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import { scienceNewsApi } from '../api/scienceNewsApi';
import { userApi } from '../api/userApi'; 
import { spaceNewsApi } from '../api/spaceNewsApi';

const store = configureStore({
  reducer: {
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
