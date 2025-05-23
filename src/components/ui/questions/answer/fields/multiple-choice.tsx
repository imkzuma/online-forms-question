import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { FieldProps } from "../answer.types";

interface MultipleChoiceFieldProps
  extends Pick<FieldProps, "control" | "index"> {
  choices: string[];
}

export const MultipleChoiceField: React.FC<MultipleChoiceFieldProps> = ({
  control,
  index,
  choices,
}) => {
  const fieldName = `answers.${index}.value` as const;

  return (
    <FormControl component="fieldset">
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <RadioGroup {...field} value={field.value || ""}>
            {choices.map((choice, i) => (
              <FormControlLabel
                key={`${choice}-${i}`}
                value={choice}
                control={<Radio />}
                label={choice}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
