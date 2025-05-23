import { TextField } from "@mui/material";
import type { FieldProps } from "../answer.types";

type ParagraphFieldProps = Pick<FieldProps, "register" | "index">;

export const ParagraphField: React.FC<ParagraphFieldProps> = ({
  register,
  index,
}) => {
  const fieldName = `answers.${index}.value` as const;

  return (
    <TextField
      fullWidth
      {...register(fieldName)}
      multiline
      rows={4}
      placeholder="Your long answer"
    />
  );
};
