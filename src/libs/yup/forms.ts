import * as Yup from "yup";
import { createQuestionSchema } from "./questions";

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
