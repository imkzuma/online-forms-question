import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type VariantType = "success" | "error" | "info" | "warning";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: VariantType;
}

interface ModalState {
  open: boolean;
  title: string;
  message: string;
  type: VariantType;
  href: string;
}

interface UIState {
  snackbar: SnackbarState;
  modal: ModalState;
}

const initialState: UIState = {
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
  modal: {
    open: false,
    title: "",
    message: "",
    type: "info",
    href: "/",
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

    showModal: (
      state,
      action: PayloadAction<{
        title: string;
        message: string;
        type: ModalState["type"];
        href: string;
      }>,
    ) => {
      state.modal = {
        open: true,
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type,
        href: action.payload.href,
      };
    },
    hideModal: (state) => {
      state.modal.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar, showModal, hideModal } =
  uiSlice.actions;

export default uiSlice.reducer;
