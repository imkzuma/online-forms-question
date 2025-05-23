import {
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
  Chip,
  Stack,
} from "@mui/material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddQuestionMutation, useCreateFormMutation } from "../../service";
import {
  createFormSchema,
  type CreateFormSchema,
} from "../../../../libs/yup/forms";
import QuestionsEditor, {
  type QuestionsEditorHandle,
} from "../../../../components/ui/questions/questions-editor";
import { useRef } from "react";
import { Add } from "@mui/icons-material";
import { Button } from "../../../../components/ui/button";

export default function CreateFormWithQuestions() {
  const questionRef = useRef<QuestionsEditorHandle>(null);

  const [createForm] = useCreateFormMutation();
  const [addQuestion] = useAddQuestionMutation();

  const methods = useForm({
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
        methods.reset();
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

      methods.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        sx={{ p: 3 }}
      >
        <Typography variant="h5">Create Form</Typography>

        <TextField
          label="Name"
          fullWidth
          {...methods.register("name")}
          margin="normal"
        />
        <TextField
          label="Slug"
          fullWidth
          {...methods.register("slug")}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          {...methods.register("description")}
          margin="normal"
        />

        <Controller
          name="allowed_domains"
          control={methods.control}
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
                  Array.isArray(field.value)
                    ? field.value.join(",")
                    : field.value
                }
                placeholder="example.com, example.org"
                error={!!methods.formState.errors.allowed_domains}
                margin="normal"
              />
            </>
          )}
        />

        <FormControlLabel
          control={
            <Controller
              name="limit_one_response"
              control={methods.control}
              render={({ field }) => <Checkbox {...field} />}
            />
          }
          label="Limit to 1 response"
        />

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Typography variant="h6" gutterBottom>
            Questions
          </Typography>
          <Button
            fullWidth={false}
            size="small"
            onClick={() => questionRef.current?.appendQuestion()}
            startIcon={<Add />}
          >
            Add Question
          </Button>
        </Stack>
        <QuestionsEditor ref={questionRef} />

        <Button
          fullWidth={false}
          type="submit"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Submit Form
        </Button>
      </Box>
    </FormProvider>
  );
}
