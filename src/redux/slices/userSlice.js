// src/slices/userSlice.js
import { getToken, setToken, removeToken } from '../utils/tokenService';

const userFromStorage = JSON.parse(localStorage.getItem('user'));
const tokenFromStorage = getToken();

const initialState = {
  user: userFromStorage || null,
  token: tokenFromStorage || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      // TOKEN SERVICE USED TO HOLD IN LOCAL STORAGE
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      setToken(action.payload.token);
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      removeToken(); 
    },
  },
});

export const { setCredentials, updateProfile, logout } = userSlice.actions;

export default userSlice.reducer;
