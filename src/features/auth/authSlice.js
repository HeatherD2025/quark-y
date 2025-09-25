import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../user/userApi";
import * as jwtDecode from "jwt-decode";
import { setToken, getToken, removeToken } from "../../utils/tokenService";

const tokenFromStorage = getToken();

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, thunkAPI) => {
    const token = getToken();

    if (!token) {
      return { isAuthenticated: false, user: null, token: null }
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
        token: token,
      };
    } catch (error) {
      removeToken();
      return { isAuthenticated: false, user: null, token: null}
    }
  }
);


const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(initializeAuth.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
    })

      .addMatcher(
        userApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          setToken(payload.token);
          state.isAuthenticated = true;
          state.token = payload.token;
          state.user = payload.user;
        }
      )
      .addMatcher(
        userApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          setToken(payload.token);
          state.isAuthenticated = true;
          state.token = payload.token;
          state.user = payload.user;
        }
      )
      .addMatcher(
        userApi.endpoints.logout.matchFulfilled,
        (state) => {
          removeToken();
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
