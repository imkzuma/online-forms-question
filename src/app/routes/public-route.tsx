import { Route, Routes } from "react-router-dom";
import MaterialUILoginPage from "../../features/auth/pages/login";

const PublicRoutes = () => (
  <Routes>
    <Route path="/auth/login" element={<MaterialUILoginPage />} />
    <Route path="*" element={<MaterialUILoginPage />} />
  </Routes>
);

export default PublicRoutes;
