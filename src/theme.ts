import { colors, createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#fe754f",
      "600": "#1a3a5f",
    },
    secondary: {
      main: "#2b83fe",
    },
    grey: {
      "50": "#f7f8fb",
      "100": "#edf2f7",
      "200": "#e2e8f0",
      "300": "#cbd5e0",
      "400": "#a0aec0",
      "500": "#718096",
      "600": "#4a5568",
      "700": "#2d3748",
      "800": "#1a202c",
      "900": "#171923",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: "contained",
        size: "medium",
        color: "primary",
        sx: { color: colors.common.white, fontSize: "0.775rem" },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
        fullWidth: true,
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
});
