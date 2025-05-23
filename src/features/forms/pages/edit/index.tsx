import { useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGetFormBySlugQuery } from "../../service";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import FormTitle from "../../_components/form-title";
import EditFormWithQuestions from "../../_components/edit/form";
import { Button } from "../../../../components/ui/button";
import type { QuestionsEditorHandle } from "../../../../components/ui/questions/questions-editor";
import { Add, Delete } from "@mui/icons-material";
import { pushDeletedQuestionId } from "../../slice";
import {
  Chip,
  Container,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

export default function EditFormPage() {
  const forms = useAppSelector((state) => state.forms);
  const dispatch = useAppDispatch();

  const { slug } = useParams<{ slug: string }>();

  const questionsRef = useRef<QuestionsEditorHandle>(null);

  const { data, isLoading } = useGetFormBySlugQuery({
    form_slug: slug as string,
  });

  if (isLoading) {
    return "Loading...";
  }

  if (!data) {
    return <Navigate to="/forms" replace />;
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <FormTitle {...data.form} />

        <Stack spacing={2} pt={3}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Typography variant="h6" gutterBottom>
              Questions
            </Typography>
            <Button
              fullWidth={false}
              size="small"
              onClick={() => questionsRef.current?.appendQuestion()}
              startIcon={<Add />}
            >
              Add Question
            </Button>
          </Stack>

          {data.form.questions.length === 0 && (
            <Typography>No questions available for this form.</Typography>
          )}

          <Stack spacing={2}>
            {data.form.questions.map((question, index) => {
              if (forms.questions_id?.includes(question.id)) {
                return null;
              }

              return (
                <Paper key={question.id} sx={{ p: 2 }} variant="outlined">
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Stack>
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
                        <Stack
                          direction="row"
                          spacing={1}
                          flexWrap="wrap"
                          mt={1}
                        >
                          {typeof question.choices === "string"
                            ? question.choices
                                .split(",")
                                .map((choice, i) => (
                                  <Chip key={i} label={choice} />
                                ))
                            : null}
                        </Stack>
                      )}
                    </Stack>
                    <Tooltip title="Delete Question">
                      <IconButton
                        color="error"
                        onClick={() =>
                          dispatch(pushDeletedQuestionId(question.id))
                        }
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Paper>
              );
            })}
          </Stack>

          <EditFormWithQuestions ref={questionsRef} initialData={data.form} />
        </Stack>
      </Stack>
    </Container>
  );
}
