import { Route, Routes } from "react-router-dom";
import FormsPage from "../../features/forms/pages";
import CreateFormPage from "../../features/forms/pages/create";
import DetailFormPage from "../../features/forms/pages/detail/page";
import FormsPageLayout from "../../features/forms/pages/layout";
import EditFormPage from "../../features/forms/pages/edit";
import AnswerFormPage from "../../features/forms/pages/answer";
import NotFoundPage from "../../components/ui/not-found";

const ProtectedRoutes = () => (
  <Routes>
    <Route path="/forms" element={<FormsPageLayout />}>
      <Route index element={<FormsPage />} />
      <Route path="create" element={<CreateFormPage />} />
      <Route path="view/:slug" element={<DetailFormPage />} />
      <Route path="edit/:slug" element={<EditFormPage />} />
      <Route path="answer/:slug" element={<AnswerFormPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default ProtectedRoutes;
