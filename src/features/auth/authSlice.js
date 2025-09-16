import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../user/userApi";
import { setToken, removeToken } from "../../utils/tokenService";
// import api from '../../features/user.api';
// import { storeToken } from '../utils/tokenService';

const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  userId: null,
  accessToken: localStorage.getItem("authToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.accessToken = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          setToken(payload.token);
          state.isAuthenticated = true;
          state.accessToken = payload.token;
          state.userId = payload.user.id;
        }
      )
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          setToken(payload.token);
          state.isAuthenticated = true;
          state.accessToken = payload.token;
          state.userId = payload.user.id;
        }
      )
      .addMatcher(
        userApi.endpoints.logout.matchFulfilled,
        (state, { payload }) => {
          removeToken(payload.token);
          state.isAuthenticated = false;
          state.userId = null;
          state.accessToken = null;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// // register
// const registerSlice = createSlice({
//   name: 'siteRegister',
//   initialState: {},
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
//   },
// });

// const loginSlice = createSlice({
//   name: 'siteLogin',
//   initialState: {},
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
//   },
// });

// const getAllUsersSlice = createSlice({
//   name: 'getAllUsers',
//   initialState: {},
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addMatcher(api.endpoints.getAllUsers.matchFulfilled);
//   },
// });

// const updateUserProfileSlice = createSlice({
//   name: 'updateUserProfile',
//   initialState: {},
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addMatcher(api.endpoints.updateUserProfile.matchFulfilled);
//   },
// });

// export const siteRegisterReducer = registerSlice.reducer;
// export const siteLoginReducer = loginSlice.reducer;
// export const getAllUsersReducer = getAllUsersSlice.reducer;
// export const updateUserProfileReducer = updateUserProfileSlice.reducer;
