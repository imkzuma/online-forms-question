import type { GetDetailFormResponse } from "../../../libs/api/schema";
import type {
  UseFormRegister,
  Control,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
  FieldValues,
} from "react-hook-form";

export type Question = GetDetailFormResponse["form"]["questions"][0];

export interface FormAnswer {
  question_id: number;
  value: string;
}

export interface FormValues extends FieldValues {
  answers: Array<FormAnswer>;
}

export interface FieldProps {
  question: Question;
  index: number;
  register: UseFormRegister<FormValues>;
  control: Control<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
  error?: FieldErrors<FormValues>["answers"];
}

export interface AnswerFormQuestionsProps {
  formSlug: string;
  questions: Question[];
}
