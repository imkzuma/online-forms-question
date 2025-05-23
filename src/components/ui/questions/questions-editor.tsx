import {
  Box,
  MenuItem,
  FormControlLabel,
  Checkbox,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import { type CreateFormSchema } from "../../../libs/yup/forms";
import { TextField } from "../field";
import { forwardRef, useImperativeHandle } from "react";
import { Add, Delete } from "@mui/icons-material";

const choiceTypes = [
  "short answer",
  "paragraph",
  "date",
  "multiple choice",
  "dropdown",
  "checkboxes",
];

export type QuestionsEditorHandle = {
  appendQuestion: () => void;
};

const QuestionsEditor = forwardRef<QuestionsEditorHandle>((_, ref) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateFormSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  useImperativeHandle(ref, () => ({
    appendQuestion: () =>
      append({
        name: "",
        choice_type: "short answer",
        is_required: false,
        choices: [],
      }),
  }));

  return (
    <Box mt={3}>
      {fields.map((field, index) => {
        const type = watch(`questions.${index}.choice_type`);

        return (
          <Box
            key={field.id}
            sx={{
              mb: 2,
              p: 2,
              border: 1,
              borderColor: "grey.200",
              borderRadius: 2,
              bgcolor: "white",
            }}
          >
            <TextField
              label="Question"
              fullWidth
              {...register(`questions.${index}.name`)}
              margin="normal"
            />

            <TextField
              label="Choice Type"
              select
              fullWidth
              defaultValue={field.choice_type}
              {...register(`questions.${index}.choice_type`)}
              margin="normal"
            >
              {choiceTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            {["multiple choice", "dropdown", "checkboxes"].includes(type) && (
              <Box mt={2}>
                <Controller
                  name={`questions.${index}.choices`}
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => {
                    const choices: string[] = Array.isArray(field.value)
                      ? field.value
                      : [];

                    const handleAddChoice = () => {
                      field.onChange([...choices, ""]);
                    };

                    const handleRemoveChoice = (choiceIndex: number) => {
                      const updated = [...choices];
                      updated.splice(choiceIndex, 1);
                      field.onChange(updated);
                    };

                    return (
                      <>
                        <Stack
                          direction="row"
                          alignItems="center"
                          mb={3}
                          spacing={2}
                        >
                          <Typography fontWeight="bold">Choices</Typography>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={handleAddChoice}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Stack>

                        <Stack spacing={3} mb={3}>
                          {choices.map((choice, choiceIndex) => {
                            const fieldError =
                              errors?.questions?.[index]?.choices?.[
                                choiceIndex
                              ];

                            const showRemove = choices.length > 1;

                            return (
                              <Box
                                key={choiceIndex}
                                display="flex"
                                alignItems={"start"}
                                gap={1}
                                mt={1}
                              >
                                {showRemove && (
                                  <IconButton
                                    color="error"
                                    onClick={() =>
                                      handleRemoveChoice(choiceIndex)
                                    }
                                  >
                                    <Delete />
                                  </IconButton>
                                )}
                                <TextField
                                  fullWidth
                                  label={`Choice ${choiceIndex + 1}`}
                                  value={choice}
                                  onChange={(e) => {
                                    const updated = [...choices];
                                    updated[choiceIndex] = e.target.value;
                                    field.onChange(updated);
                                  }}
                                  error={Boolean(fieldError)}
                                  helperText={fieldError?.message?.toString()}
                                />
                              </Box>
                            );
                          })}
                        </Stack>
                      </>
                    );
                  }}
                />
              </Box>
            )}

            <Stack direction={"row"} justifyContent={"end"}>
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: 14,
                  },
                  "& .MuiCheckbox-root": {
                    padding: 0,
                    mr: 0.5,
                  },
                }}
                control={
                  <Controller
                    name={`questions.${index}.is_required`}
                    control={control}
                    render={({ field }) => <Checkbox {...field} />}
                  />
                }
                label="Required"
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => remove(index)}
              >
                <Delete />
              </IconButton>
            </Stack>
          </Box>
        );
      })}
    </Box>
  );
});

export default QuestionsEditor;
