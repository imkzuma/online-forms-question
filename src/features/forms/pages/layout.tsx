import { Outlet } from "react-router-dom";
import MainLayout from "../../../layout/main";

export default function FormsPageLayout() {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
