import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import type { FieldProps } from "../answer.types";
import { useCallback, useMemo } from "react";

interface CheckboxFieldProps
  extends Pick<FieldProps, "setValue" | "watch" | "index"> {
  choices: string[];
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  setValue,
  watch,
  index,
  choices,
}) => {
  const fieldName = `answers.${index}.value` as const;
  const value = watch(fieldName);

  const currentValues = useMemo(() => {
    if (typeof value === "string" && value) {
      return value.split(",").map((v) => v.trim());
    }
    return [];
  }, [value]);

  const handleCheckboxChange = useCallback(
    (choice: string, checked: boolean) => {
      const updated = checked
        ? [...currentValues, choice]
        : currentValues.filter((v) => v !== choice);

      const newValue = updated.length > 0 ? updated.join(", ") : "";
      setValue(fieldName, newValue);
    },
    [currentValues, setValue, fieldName],
  );

  return (
    <FormGroup>
      {choices.map((choice, i) => (
        <FormControlLabel
          key={`${choice}-${i}`}
          control={
            <Checkbox
              checked={currentValues.includes(choice)}
              onChange={(e) => handleCheckboxChange(choice, e.target.checked)}
            />
          }
          label={choice}
        />
      ))}
    </FormGroup>
  );
};
