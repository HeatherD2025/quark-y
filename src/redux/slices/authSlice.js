import { createSlice } from "@reduxjs/toolkit";
import api from "../../api/user.api";
import { storeToken } from "../utils/tokenService";

// register
const registerSlice = createSlice({
  name: "siteRegister",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.register.matchFulfilled, storeToken);
  },
});

const loginSlice = createSlice({
  name: "siteLogin",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, storeToken);
  },
});

const getAllUsersSlice = createSlice({
  name: "getAllUsers",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getAllUsers.matchFulfilled);
  },
});

const updateUserProfileSlice = createSlice({
  name: "updateUserProfile",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.updateUserProfile.matchFulfilled);
  },
});

export const siteRegisterReducer = registerSlice.reducer;
export const siteLoginReducer = loginSlice.reducer;
export const getAllUsersReducer = getAllUsersSlice.reducer;
export const updateUserProfileReducer = updateUserProfileSlice.reducer;
