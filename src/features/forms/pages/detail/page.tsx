import { Navigate, useParams } from "react-router-dom";
import { useGetFormBySlugQuery } from "../../service";
import { Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { WarningAmber } from "@mui/icons-material";
import FormTitle from "../../_components/form-title";

export default function DetailFormPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isFetching } = useGetFormBySlugQuery({
    form_slug: slug as string,
  });

  if (isFetching) {
    return "Loading...";
  }

  if (!data) {
    return <Navigate to="/forms" replace />;
  }

  const { limit_one_response, questions } = data.form;

  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <FormTitle {...data.form} />

        {limit_one_response && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            bgcolor={"#f8d7da"}
            border={1}
            borderColor={"#f5c2c7"}
            color={"#842029"}
            borderRadius={1}
            sx={{ p: 2 }}
          >
            <WarningAmber fontSize="large" />
            <Typography fontWeight="bold" fontSize={14}>
              This form can only be answered once per user. Please make sure
              your answers are final before submitting.
            </Typography>
          </Stack>
        )}

        <Stack spacing={2} pt={3}>
          <Typography variant="h6" gutterBottom>
            Questions
          </Typography>

          {questions.length === 0 && (
            <Typography>No questions available for this form.</Typography>
          )}

          <Stack spacing={2}>
            {questions.map((question, index) => (
              <Paper key={question.id} sx={{ p: 2 }} variant="outlined">
                <Typography variant="subtitle1">
                  {index + 1}. {question.name}
                  <span style={{ color: "red" }}>
                    {question.is_required && " * "}
                  </span>
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                  sx={{ textTransform: "capitalize" }}
                >
                  Type: {question.choice_type}
                </Typography>

                {question.choices && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
                    {typeof question.choices === "string"
                      ? question.choices
                          .split(",")
                          .map((choice, i) => <Chip key={i} label={choice} />)
                      : null}
                  </Stack>
                )}
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
