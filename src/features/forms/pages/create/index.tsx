import { Container } from "@mui/material";
import CreateFormWithQuestions from "../../_components/create/form";
import HeaderWithBackButton from "../../_components/header/with-back-button";

export default function CreateFormPage() {
  return (
    <Container maxWidth="lg">
      <HeaderWithBackButton title="Create Form" backHref="/forms" />
      <CreateFormWithQuestions />
    </Container>
  );
}
