import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/services";
import authSlice from "../features/auth/slice";
import { formsApi } from "../features/forms/service";
import uiReducer from "../components/ui/ui.slice";
import formSlice from "../features/forms/slice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [formsApi.reducerPath]: formsApi.reducer,

    auth: authSlice,
    ui: uiReducer,
    forms: formSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, formsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
