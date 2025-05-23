import { TextField } from "@mui/material";
import type { FieldProps } from "../answer.types";

type ShortAnswerFieldProps = Pick<FieldProps, "register" | "index">;

export const ShortAnswerField: React.FC<ShortAnswerFieldProps> = ({
  register,
  index,
}) => {
  const fieldName = `answers.${index}.value` as const;

  return (
    <TextField
      fullWidth
      {...register(fieldName)}
      placeholder="Your answer"
      size="small"
    />
  );
};
