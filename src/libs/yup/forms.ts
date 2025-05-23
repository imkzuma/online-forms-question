import * as Yup from "yup";
import { QUESTION_CHOICE_TYPES } from "../../utils/constants";

export type CreateQuestionSchema = Yup.InferType<typeof createQuestionSchema>;
export const createQuestionSchema = Yup.object().shape({
  name: Yup.string().required("Question is required"),
  choice_type: Yup.string().oneOf(QUESTION_CHOICE_TYPES).required(),
  is_required: Yup.boolean().required("Is required is required"),
  choices: Yup.array().when("choice_type", {
    is: (val: string) =>
      ["multiple choice", "dropdown", "checkboxes"].includes(val),
    then: () =>
      Yup.array()
        .of(Yup.string().required("Each choice must be filled"))
        .min(1, "At least one choice is required"),
    otherwise: () => Yup.mixed().notRequired(),
  }),
});

import type { Question } from "../../components/questions/answer/answer.types";

export const createDynamicValidationSchema = (questions: Question[]) => {
  return Yup.object().shape({
    answers: Yup.array()
      .of(
        Yup.object().shape({
          question_id: Yup.number().required(),
          value: Yup.mixed().test(
            "is-required",
            "This field is required",
            function (value) {
              const questionId = this.parent.question_id;
              const question = questions.find((q) => q.id === questionId);

              if (question?.is_required) {
                return value !== undefined && value !== null && value !== "";
              }
              return true;
            },
          ),
        }),
      )
      .required("Answers are required"),
  });
};

export type CreateFormSchema = Yup.InferType<typeof createFormSchema>;
export const createFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Form name is required")
    .min(3, "Form name must be at least 3 characters long"),
  slug: Yup.string()
    .required("Form slug is required")
    .matches(
      /^[a-z0-9]+(?:[-\\.][a-z0-9]+)*$/,
      "Slug must be lowercase, alphanumeric, and may include dash or dot (no spaces)",
    )

    .min(3, "Form slug must be at least 3 characters long"),
  allowed_domains: Yup.array()
    .of(Yup.string().required("Domain is required"))
    .required(),
  description: Yup.string().notRequired(),
  limit_one_response: Yup.boolean()
    .required("Limit one response is required")
    .default(true),
  questions: Yup.array().of(createQuestionSchema),
});
