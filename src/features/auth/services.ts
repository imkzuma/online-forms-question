import { createApi } from "@reduxjs/toolkit/query/react";
import type {
  LogoutResponse,
  LoginRequest,
  LoginResponse,
} from "../../libs/api/schema";
import { baseQuery } from "../../libs/api";
import { clearUser, setAuthStatus, setUser } from "./slice";
import { showSnackbar } from "../../components/ui/ui.slice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        dispatch(setAuthStatus("loading"));
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("user", JSON.stringify(data.user));

          dispatch(setUser(data));
          dispatch(setAuthStatus("authenticated"));
        } catch {
          dispatch(setAuthStatus("unauthenticated"));
          dispatch(
            showSnackbar({
              message: "Login failed. Please check your credentials.",
              severity: "error",
            }),
          );
        }
      },
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("user");

          dispatch(clearUser());
          dispatch(
            showSnackbar({
              message: "Logout successful.",
              severity: "success",
            }),
          );
        } catch {
          dispatch(
            showSnackbar({
              message: "Logout failed. Please try again.",
              severity: "error",
            }),
          );
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
