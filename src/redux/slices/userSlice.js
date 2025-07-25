import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
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

export const { loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;