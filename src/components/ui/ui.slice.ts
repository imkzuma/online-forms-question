import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

interface UIState {
  snackbar: SnackbarState;
}

const initialState: UIState = {
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showSnackbar(
      state,
      action: PayloadAction<{
        message: string;
        severity: SnackbarState["severity"];
      }>,
    ) {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity,
      };
    },
    hideSnackbar(state) {
      state.snackbar.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = uiSlice.actions;

export default uiSlice.reducer;
