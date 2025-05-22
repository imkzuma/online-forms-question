import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFormBySlugQuery } from "../../service";
import { useAppDispatch } from "../../../../utils/hooks/redux";
import { showSnackbar } from "../../../../components/ui/ui.slice";
import { Chip, Container, Paper, Stack, Typography } from "@mui/material";
import { WarningAmber } from "@mui/icons-material";

export default function EditFormPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const { data, isFetching } = useGetFormBySlugQuery({
    form_slug: slug as string,
  });

  useEffect(() => {
    if (!isFetching && !data) {
      dispatch(
        showSnackbar({
          message: "Form not found, please try again later.",
          severity: "error",
        }),
      );
      navigate("/forms", { replace: true });
    }
  }, [isFetching, data, dispatch, navigate]);

  if (isFetching) {
    return "Loading...";
  }

  if (!data) {
    return null;
  }

  const { name, description, allowed_domains, limit_one_response, questions } =
    data.form;

  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <Stack
          bgcolor={"white"}
          borderRadius={1.5}
          sx={{
            p: 3,
            border: 1,
            borderColor: "grey.200",
            borderTop: 10,
            borderTopColor: "primary.main",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {description}
          </Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"} pt={3}>
            <Typography color="grey.600" fontSize={14}>
              <strong>Allowed Domains:</strong>
            </Typography>
            {allowed_domains.length > 0
              ? allowed_domains.map((domain) => (
                  <Chip key={domain} label={domain} />
                ))
              : "No domains allowed"}
          </Stack>
        </Stack>

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
