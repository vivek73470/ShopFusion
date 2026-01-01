import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

const initialState = {
  token: tokenFromStorage || null,
  userData: null,
  requestPass: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setRequestPass: (state, action) => {
      state.requestPass = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    },
  },
});

export const { setToken, setUserData, setRequestPass, logout } = authSlice.actions;
export default authSlice.reducer;


