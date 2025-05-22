import { Route, Routes } from "react-router-dom";
import FormsPage from "../../features/forms/pages";
import CreateFormPage from "../../features/forms/pages/create";
import DetailFormPage from "../../features/forms/pages/detail/page";
import FormsPageLayout from "../../features/forms/pages/layout";

const ProtectedRoutes = () => (
  <Routes>
    <Route path="/forms" element={<FormsPageLayout />}>
      <Route index element={<FormsPage />} />
      <Route path="create" element={<CreateFormPage />} />
      <Route path="view/:slug" element={<DetailFormPage />} />
    </Route>
    <Route path="*" element={<h1>notfound</h1>} />
  </Routes>
);

export default ProtectedRoutes;
