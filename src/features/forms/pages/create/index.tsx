import CreateFormWithQuestions from "../../_components/create-form/form";
import HeaderWithBackButton from "../../_components/header/with-back-button";

export default function CreateFormPage() {
  return (
    <>
      <HeaderWithBackButton title="Create Form" backHref="/forms" />
      <CreateFormWithQuestions />
    </>
  );
}
