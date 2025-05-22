import { useLocation, Navigate } from "react-router-dom";
import PublicRoutes from "./public-route";
import ProtectedRoutes from "./protected-route";
import { useAppSelector } from "../../utils/hooks/redux";

const Routes = () => {
  const { authenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (authenticated === "authenticated") {
    if (location.pathname === "/auth/login") {
      return <Navigate to="/forms" replace />;
    }

    return <ProtectedRoutes />;
  }

  if (authenticated === "unauthenticated") {
    return <PublicRoutes />;
  }

  return "loading...";
};

export default Routes;
