import { Button, Stack } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { useAnswerQuestionMutation } from "../../../../features/forms/service";

import { QuestionCard } from "./question-card";
import type {
  AnswerFormQuestionsProps,
  FormAnswer,
  FormValues,
  Question,
} from "./answer.types";
import { createDynamicValidationSchema } from "../../../../libs/yup/forms";
import { useCallback } from "react";

const getInitialFormValues = (questions: Question[]): FormValues => ({
  answers: questions.map((question) => ({
    question_id: question.id,
    value: "",
  })),
});

const filterNonEmptyAnswers = (
  answers: FormAnswer[],
  questions: Question[],
): FormAnswer[] => {
  return answers.filter((answer) => {
    const question = questions.find((q) => q.id === answer.question_id);
    if (!question) return false;

    if (!question.is_required) {
      return (
        answer.value !== "" &&
        answer.value !== null &&
        (!Array.isArray(answer.value) || answer.value.length > 0)
      );
    }

    return true;
  });
};

export const AnswerFormQuestions: React.FC<AnswerFormQuestionsProps> = ({
  formSlug,
  questions,
}) => {
  const [answerQuestion, { isLoading }] = useAnswerQuestionMutation();

  const methods = useForm<FormValues>({
    // @ts-expect-error missmatch typechecking
    resolver: yupResolver(createDynamicValidationSchema(questions)),
    defaultValues: getInitialFormValues(questions),
    mode: "onTouched",
  });

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (data: FormValues) => {
      try {
        const filteredAnswers = filterNonEmptyAnswers(data.answers, questions);

        await answerQuestion({
          form_slug: formSlug,
          data: { answers: filteredAnswers },
        }).unwrap();

        methods.reset();
      } catch (error) {
        console.error("Failed to submit form:", error);
      }
    },
    [questions, formSlug, answerQuestion, methods],
  );

  return (
    <FormProvider {...methods}>
      <form
        // @ts-expect-error missmatch typechecking
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack spacing={3}>
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              questionNumber={index + 1}
              register={register}
              setValue={setValue}
              watch={watch}
              error={errors.answers}
              // @ts-expect-error missmatch typechecking
              control={control}
            />
          ))}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={Object.keys(errors).length > 0 || questions.length === 0}
            size="large"
            sx={{ mt: 3 }}
          >
            {isLoading ? "Submitting..." : "Submit Form"}
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
};
