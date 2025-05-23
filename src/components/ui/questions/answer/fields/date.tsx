import { TextField } from "@mui/material";
import type { FieldProps } from "../answer.types";

type DateFieldProps = Pick<FieldProps, "register" | "index">;

export const DateField: React.FC<DateFieldProps> = ({ register, index }) => {
  const fieldName = `answers.${index}.value` as const;

  return (
    <TextField
      fullWidth
      {...register(fieldName)}
      type="date"
      size="small"
      InputLabelProps={{ shrink: true }}
    />
  );
};
