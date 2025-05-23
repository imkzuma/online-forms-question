import { Box, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
} from "../../service";
import {
  createFormSchema,
  type CreateFormSchema,
} from "../../../../libs/yup/forms";
import QuestionsEditor, {
  type QuestionsEditorHandle,
} from "../../../../components/ui/questions/questions-editor";
import type { GetDetailFormResponse } from "../../../../libs/api/schema";
import { forwardRef } from "react";
import { Button } from "../../../../components/ui/button";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/redux";
import { clearDeletedQuestionId } from "../../slice";

interface Props {
  initialData: GetDetailFormResponse["form"];
}

const EditFormWithQuestions = forwardRef<QuestionsEditorHandle, Props>(
  ({ initialData }, ref) => {
    const dispatch = useAppDispatch();
    const forms = useAppSelector((state) => state.forms);

    const [addQuestion] = useAddQuestionMutation();
    const [removeQuestion] = useDeleteQuestionMutation();

    const methods = useForm({
      resolver: yupResolver(createFormSchema),
      defaultValues: {
        name: initialData.name,
        slug: initialData.slug,
        description: initialData.description || "",
        allowed_domains: initialData.allowed_domains,
        limit_one_response: initialData.limit_one_response,
        questions: [],
      },
      mode: "onChange",
    });

    const onSubmit = async (data: CreateFormSchema) => {
      console.log(data);
      try {
        const slug = initialData.slug;

        if (!data.questions) {
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
              form_id: initialData.id,
              choices: q.choices,
            },
          }).unwrap();
        }

        if (forms.questions_id && forms.questions_id.length > 0) {
          for (const id of forms.questions_id) {
            await removeQuestion({
              form_slug: slug,
              question_id: id,
            });
          }
        }

        methods.reset();
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <QuestionsEditor ref={ref} />
          <Stack
            justifyContent={"end"}
            alignContent={"center"}
            direction={"row"}
            spacing={1}
          >
            <Button
              fullWidth={false}
              onClick={() => {
                methods.reset();
                dispatch(clearDeletedQuestionId());
              }}
              sx={{
                bgcolor: "grey.200",
                color: "grey.800",
                "&:hover": {
                  bgcolor: "grey.300",
                },
                fontSize: 12,
              }}
            >
              Cancel
            </Button>
            <Button fullWidth={false} type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    );
  },
);

export default EditFormWithQuestions;
