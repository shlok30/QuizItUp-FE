// authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  isAuthResolved: boolean;
};

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  isAuthResolved: false,
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
    setAuthResolver: state => {
      state.isAuthResolved = true;
    },
  },
});
/*
Auth resolution will only happen during mounting of app initially
So it will set logged in or logged out in the beginning (This helps with stale keys or valid keys still in ls)
If user is logged out, actually logging in will still need to set the AuthResolver to true to by pass the loading component render inside our protected route
Once user logs out and tries to go to a protected route we don't need to show loader anymore and just keep isLoggedIn as false that means that isResovled is true in the begging itself regardless of whether user is actually logged in or not

*/
export const { setLogin, setLogout, setAuthResolver } = authSlice.actions;

export default authSlice.reducer;
