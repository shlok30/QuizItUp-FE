// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: localStorage.getItem('token') ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin: state => {
      state.isLoggedIn = true;
    },
    setLogout: state => {
      state.isLoggedIn = false;
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
