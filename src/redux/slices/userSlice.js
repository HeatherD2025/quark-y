import { createSlice } from "@reduxjs/toolkit";
import { getToken } from "../../utils/tokenService";

const initialState = {
    user: null,
    token: getToken(),
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        registerSuccess: (state, action) => {
          state.user= action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        },
        loginSuccess: (state, action) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.error = null;
        },
        loginFailure: (state, action) => {
          state.error = action.payload;
          state.user = null;
          state.token = null;
        },
        logout: (state) => {
          state.user = null;
          state.token = null;
          state.error = null;
        },
    },
});

export const { registerSuccess, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;