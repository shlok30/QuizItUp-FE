import { NavigateFunction } from "react-router";
import { setLogout } from "./features/auth";
import { AppDispatch } from "./store";

export const handleAuthError = (status: number, dispatch: AppDispatch, navigate: NavigateFunction) => {
  if (status === 403) {
    dispatch(setLogout());
    navigate("/login");
  }
};