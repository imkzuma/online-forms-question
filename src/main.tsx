import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/index.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.tsx";
import { BrowserRouter } from "react-router-dom";
import { colors, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
