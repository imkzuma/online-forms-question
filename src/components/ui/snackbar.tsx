import {
  Alert,
  type SnackbarProps,
  Snackbar as MUISnackbar,
} from "@mui/material";
import { forwardRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import { hideSnackbar } from "./ui.slice";

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(function (
  { ...props },
  ref,
) {
  const dispatch = useAppDispatch();
  const snackbar = useAppSelector((state) => state.ui.snackbar);

  return (
    <MUISnackbar
      open={snackbar.open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      ref={ref}
      {...props}
      onClose={() => dispatch(hideSnackbar())}
    >
      <Alert
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: "100%", py: 1, px: 3 }}
      >
        {snackbar.message}
      </Alert>
    </MUISnackbar>
  );
});
