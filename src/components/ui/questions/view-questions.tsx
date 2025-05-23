import { Chip, Paper, Stack, Typography } from "@mui/material";
import type { GetDetailFormResponse } from "../../../libs/api/schema";

export default function ViewQuestions({
  questions,
}: {
  questions: GetDetailFormResponse["form"]["questions"];
}) {
  return (
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
  );
}
