import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  MenuItem,
  Chip,
} from "@mui/material";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddQuestionMutation, useCreateFormMutation } from "../../service";
import {
  createFormSchema,
  type CreateFormSchema,
} from "../../../../libs/yup/forms";

const choiceTypes = [
  "short answer",
  "paragraph",
  "date",
  "multiple choice",
  "dropdown",
  "checkboxes",
];

export default function CreateFormWithQuestions() {
  const [createForm] = useCreateFormMutation();
  const [addQuestion] = useAddQuestionMutation();

  const {
    control,
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      allowed_domains: [""],
      limit_one_response: false,
      questions: [],
    },
    mode: "onChange",
  });

  console.log(errors);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data: CreateFormSchema) => {
    console.log(data);
    try {
      const formRes = await createForm({
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        allowed_domains: data.allowed_domains,
        limit_one_response: data.limit_one_response,
      }).unwrap();

      const slug = formRes.form.slug;

      if (!data.questions) {
        reset();
        return;
      }

      for (const q of data.questions) {
        await addQuestion({
          form_slug: slug,
          data: {
            // @ts-expect-error False error type
            choice_type: q.choice_type,
            name: q.name,
            is_required: q.is_required,
            form_id: formRes.form.id,
            choices: q.choices,
          },
        }).unwrap();
      }

      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
      <Typography variant="h5">Create Form</Typography>
      <TextField label="Name" fullWidth {...register("name")} margin="normal" />
      <TextField label="Slug" fullWidth {...register("slug")} margin="normal" />
      <TextField
        label="Description"
        fullWidth
        {...register("description")}
        margin="normal"
      />
      <Controller
        name="allowed_domains"
        control={control}
        render={({ field }) => (
          <>
            {Array.isArray(field.value) && field.value.length > 0 && (
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {field.value.map((domain, i) => {
                  if (domain.length === 0) return null;
                  return <Chip key={i} label={domain} />;
                })}
              </Box>
            )}
            <TextField
              label="Allowed Domains (comma separated)"
              fullWidth
              onChange={(e) => {
                const value = e.target.value.split(",").map((v) => v.trim());
                field.onChange(value);
              }}
              onBlur={() => {
                const uniqueDomains = Array.from(
                  new Set(
                    (field.value || [])
                      .map((v) => v.trim())
                      .filter((v) => v.length > 0),
                  ),
                );
                field.onChange(uniqueDomains);
                field.onBlur();
              }}
              value={
                Array.isArray(field.value) ? field.value.join(",") : field.value
              }
              placeholder="example.com, example.org"
              error={!!errors.allowed_domains}
              margin="normal"
            />
          </>
        )}
      />

      <FormControlLabel
        control={
          <Controller
            name="limit_one_response"
            control={control}
            render={({ field }) => <Checkbox {...field} />}
          />
        }
        label="Limit to 1 response"
      />

      <Box mt={3}>
        <Typography variant="h6">Questions</Typography>
        {fields.map((field, index) => {
          const type = watch(`questions.${index}.choice_type`);
          return (
            <Box
              key={field.id}
              sx={{ mb: 2, p: 2, border: "1px solid #ccc", borderRadius: 2 }}
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
                {...register(`questions.${index}.choice_type`)}
                margin="normal"
              >
                {choiceTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <FormControlLabel
                control={
                  <Controller
                    name={`questions.${index}.is_required`}
                    control={control}
                    render={({ field }) => <Checkbox {...field} />}
                  />
                }
                label="Required"
              />

              {["multiple choice", "dropdown", "checkboxes"].includes(type) && (
                <Controller
                  name={`questions.${index}.choices`}
                  control={control}
                  render={({ field }) => (
                    <>
                      {Array.isArray(field.value) && field.value.length > 0 && (
                        <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                          {field.value.map((choice, i) => (
                            <Chip key={i} label={choice} />
                          ))}
                        </Box>
                      )}

                      <TextField
                        label="Choices (comma separated)"
                        fullWidth
                        margin="normal"
                        placeholder="React JS, Vue JS, Angular"
                        value={
                          Array.isArray(field.value)
                            ? field.value.join(",")
                            : field.value || ""
                        }
                        onChange={(e) => {
                          const value = e.target.value
                            .split(",")
                            .map((v) => v.trim());
                          field.onChange(value);
                        }}
                        onBlur={() => {
                          const arr = (field.value || [])
                            .map((v: string) => v.trim())
                            .filter((v: string) => v.length > 0);
                          field.onChange(arr);
                          field.onBlur();
                        }}
                        error={!!errors?.questions?.[index]?.choices}
                        helperText={
                          errors?.questions?.[index]?.choices?.message
                        }
                      />
                    </>
                  )}
                />
              )}

              <Button color="error" onClick={() => remove(index)}>
                Remove
              </Button>
            </Box>
          );
        })}
        <Button
          variant="outlined"
          onClick={() =>
            append({
              name: "",
              choice_type: "",
              is_required: false,
              choices: [],
            })
          }
        >
          Add Question
        </Button>
      </Box>

      <Button type="submit" variant="contained" sx={{ mt: 3 }}>
        Submit Form
      </Button>
    </Box>
  );
}
