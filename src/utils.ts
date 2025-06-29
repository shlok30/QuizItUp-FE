import { NavigateFunction } from "react-router";
import { setLogout } from "./features/auth";
import { AppDispatch } from "./store";

export const handleAuthError = (status: number, dispatch: AppDispatch, navigate: NavigateFunction) => {
  if (status === 403) {
    dispatch(setLogout());
    navigate("/login");
  }
};

export function getCacheKey(searchParams: URLSearchParams): string {
  const params: Record<string, string> = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  const sortedKeys = Object.keys(params).sort();
  const normalizedParams = sortedKeys.map(key => `${key}=${params[key]}`).join("&");

  return normalizedParams;
}