import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../user/userApi";
import * as jwtDecode from "jwt-decode";
import { setToken, getToken, removeToken } from "../../utils/tokenService";

const tokenFromStorage = getToken();

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, thunkAPI) => {
    const token = getToken();
    const decoded = jwtDecode(token);

    if (!token) {
      return { isAuthenticated: false, user: null, accessToken: null }
    }

    try {
      const decoded = jwtDecode(token);
      const user = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        isAdmin: decoded.isAdmin || false,
      }
      return {
        isAuthenticated: true,
        user,
        accessToken: token,
      };
    } catch (error) {
      removeToken();
      return { isAuthenticated: false, user: null, accessToken: null}
    }
  }
);


const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(initializeAuth.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    })

      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          setToken(payload.token);
          state.isAuthenticated = true;
          state.accessToken = payload.token;
          state.user = payload.user;
        }
      )
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          setToken(payload.token);
          state.isAuthenticated = true;
          state.accessToken = payload.token;
          state.user = payload.user;
        }
      )
      .addMatcher(
        userApi.endpoints.logout.matchFulfilled,
        (state) => {
          removeToken();
          state.isAuthenticated = false;
          state.user = null;
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
