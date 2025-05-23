import { useParams } from "react-router-dom";
import { useGetFormBySlugQuery } from "../../service";
import { Container, Stack } from "@mui/material";
import FormTitle from "../../_components/form-title";
import FormLimitResponse from "../../_components/form-limit-response";
import { AnswerFormQuestions } from "../../../../components/questions/answer";
import Loading from "../../../../components/ui/loading";

export default function AnswerFormPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isFetching } = useGetFormBySlugQuery({
    form_slug: slug as string,
  });

  if (isFetching) {
    return <Loading />;
  }
  if (!data) return null;

  const { limit_one_response } = data.form;

  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <FormLimitResponse isLimitOneResponse={limit_one_response} />
        <FormTitle {...data.form} />
        <AnswerFormQuestions
          formSlug={slug as string}
          questions={data.form.questions}
        />
      </Stack>
    </Container>
  );
}
