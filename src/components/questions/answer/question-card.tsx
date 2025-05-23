import { FormLabel, Stack } from "@mui/material";
import { FieldRenderer } from "./dynamic-field";
import type { FieldProps } from "./answer.types";

interface QuestionCardProps extends FieldProps {
  questionNumber: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  index,
  questionNumber,
  register,
  control,
  setValue,
  watch,
  error,
}) => {
  const hasError = Boolean(error?.[index]);

  return (
    <Stack
      bgcolor="white"
      sx={{
        p: 2,
        borderRadius: 1,
        border: hasError ? "2px solid #f44336" : "1px solid #e0e0e0",
      }}
      spacing={2}
    >
      <FormLabel
        component="legend"
        required={question.is_required}
        sx={{
          fontWeight: 500,
          color: hasError ? "#f44336" : "inherit",
        }}
      >
        {questionNumber}. {question.name}
      </FormLabel>

      <FieldRenderer
        question={question}
        index={index}
        register={register}
        control={control}
        setValue={setValue}
        watch={watch}
        error={error}
      />

      {hasError && (
        <FormLabel
          sx={{
            color: "#f44336",
            fontSize: "0.75rem",
            mt: 0.5,
          }}
        >
          {error?.[index]?.value?.message}
        </FormLabel>
      )}
    </Stack>
  );
};
