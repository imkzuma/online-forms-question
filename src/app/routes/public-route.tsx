import { Route, Routes } from "react-router-dom";
import LoginPage from "../../features/auth/pages/login";

const PublicRoutes = () => (
  <Routes>
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="*" element={<LoginPage />} />
  </Routes>
);

export default PublicRoutes;
