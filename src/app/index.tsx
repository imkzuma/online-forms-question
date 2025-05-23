import Routes from "./routes";

import { useAppDispatch } from "../utils/hooks/redux";
import { Fragment, useEffect } from "react";
import { rehydrate, setAuthStatus } from "../features/auth/slice";
import type { LoginResponse } from "../libs/api/schema";
import { Snackbar } from "../components/ui/snackbar";
import { showSnackbar } from "../components/ui/ui.slice";
import GlobalAlertDialog from "../components/ui/alert-dialog";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch(setAuthStatus("loading"));
      try {
        const parsedUser: LoginResponse["user"] = JSON.parse(user);
        if (parsedUser.accessToken) {
          dispatch(setAuthStatus("authenticated"));
          dispatch(rehydrate(parsedUser));
        }
      } catch {
        dispatch(setAuthStatus("unauthenticated"));
        dispatch(
          showSnackbar({
            message: "Internal server error. Please try again.",
            severity: "error",
          }),
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <Routes />
      <Snackbar />
      <GlobalAlertDialog />
    </Fragment>
  );
}
