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
      Yup.array().of(Yup.string().required()).min(1, "Choices required"),
    otherwise: () => Yup.mixed().notRequired(),
  }),
});

export type CreateFormSchema = Yup.InferType<typeof createFormSchema>;
export const createFormSchema = Yup.object().shape({
  name: Yup.string()
    .required("Form name is required")
    .min(3, "Form name must be at least 3 characters long"),
  slug: Yup.string()
    .required("Form slug is required")
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase and hyphen-separated",
    )
    .min(3, "Form slug must be at least 3 characters long"),
  allowed_domains: Yup.array()
    .of(Yup.string().required("Domain is required"))
    .required(),
  description: Yup.string().min(
    10,
    "Description must be at least 10 characters long",
  ),
  limit_one_response: Yup.boolean()
    .required("Limit one response is required")
    .default(true),
  questions: Yup.array().of(createQuestionSchema),
});
