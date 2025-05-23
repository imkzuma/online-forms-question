import {
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
} from "../../../../components/questions/questions-editor";
import { useRef } from "react";
import { Add } from "@mui/icons-material";
import { Button } from "../../../../components/ui/button";
import { TextField } from "../../../../components/ui/field";

export default function CreateFormWithQuestions() {
  const questionRef = useRef<QuestionsEditorHandle>(null);

  const [createForm, { isLoading: loadingCreateForm }] =
    useCreateFormMutation();

  const [addQuestion, { isLoading: loadingAddQuestion }] =
    useAddQuestionMutation();

  const methods = useForm({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: undefined,
      allowed_domains: [""],
      limit_one_response: false,
      questions: [
        {
          name: "",
          choice_type: "short answer",
          is_required: false,
          choices: [],
        },
      ],
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
      <Stack
        spacing={3}
        mt={4}
        component="form"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <Stack
          bgcolor={"white"}
          p={2}
          borderRadius={2}
          border={1}
          borderColor={"grey.200"}
        >
          <TextField
            label="Name"
            fullWidth
            {...methods.register("name")}
            margin="normal"
            required
            placeholder="Example Form"
            error={!!methods.formState.errors.name}
            helperText={methods.formState.errors.name?.message || ""}
          />
          <TextField
            label="Slug"
            placeholder="example-form"
            fullWidth
            required
            {...methods.register("slug")}
            margin="normal"
            error={!!methods.formState.errors.slug}
            helperText={methods.formState.errors.slug?.message || ""}
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
                  required
                  onChange={(e) => {
                    const value = e.target.value
                      .split(",")
                      .map((v) => v.trim());
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
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            {...methods.register("description")}
            margin="normal"
          />

          <FormControlLabel
            sx={{ width: "fit-content" }}
            control={
              <Controller
                name="limit_one_response"
                control={methods.control}
                render={({ field }) => <Checkbox {...field} />}
              />
            }
            label="Limit to 1 response"
          />
        </Stack>

        <Stack spacing={1}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignContent={"center"}
          >
            <Typography variant="h6">Questions</Typography>
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
        </Stack>

        <Stack
          justifyContent={"end"}
          alignContent={"center"}
          direction={"row"}
          spacing={1}
        >
          <Button
            fullWidth={false}
            onClick={() => methods.reset()}
            sx={{
              bgcolor: "grey.200",
              color: "grey.800",
              "&:hover": {
                bgcolor: "grey.300",
              },
              fontSize: 12,
            }}
            disabled={loadingCreateForm || loadingAddQuestion}
          >
            Cancel
          </Button>
          <Button
            fullWidth={false}
            type="submit"
            variant="contained"
            loading={loadingCreateForm || loadingAddQuestion}
            loadingIndicator="Creating..."
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
