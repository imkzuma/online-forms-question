import { MenuItem, TextField } from "@mui/material";
import type { FieldProps } from "../answer.types";

interface DropdownFieldProps
  extends Pick<FieldProps, "register" | "watch" | "index"> {
  choices: string[];
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  register,
  watch,
  index,
  choices,
}) => {
  const fieldName = `answers.${index}.value` as const;
  const value = watch(fieldName);

  return (
    <TextField
      select
      fullWidth
      {...register(fieldName)}
      size="small"
      value={value || ""}
    >
      <MenuItem value="">
        <em>Select an option</em>
      </MenuItem>
      {choices.map((choice, i) => (
        <MenuItem key={`${choice}-${i}`} value={choice}>
          {choice}
        </MenuItem>
      ))}
    </TextField>
  );
};
