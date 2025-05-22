import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "../../libs/api/schema";

interface AuthState extends LoginResponse {
  authenticated: "authenticated" | "unauthenticated" | "loading";
}

const initialState: AuthState = {
  authenticated: "unauthenticated",
  user: {
    name: "",
    email: "",
    accessToken: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStatus: (
      state,
      action: PayloadAction<AuthState["authenticated"]>,
    ) => {
      state.authenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<LoginResponse>) => {
      state.user = state.user = action.payload.user;
    },
    clearUser: (state) => {
      state.user = initialState.user;
    },
    rehydrate: (state, action: PayloadAction<LoginResponse["user"]>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setAuthStatus, clearUser, rehydrate } =
  authSlice.actions;
export default authSlice.reducer;
