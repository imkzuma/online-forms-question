export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    name: string;
    email: string;
    accessToken: string;
  };
}

export interface LogoutResponse {
  message: string;
}

interface FormField {
  name: string;
  slug: string;
  allowed_domains: string[];
  description: string | null;
  limit_one_response: boolean;
}

export type CreateFormRequest = FormField;

export interface CreateFormResponse {
  message: string;
  form: Omit<FormField, "allowed_domains"> & {
    creator_id: number;
    id: number;
  };
}

export interface GetAllFormResponse {
  message: string;
  forms: Array<
    Omit<FormField, "allowed_domains"> & {
      creator_id: number;
      id: number;
    }
  >;
}

type BasicChoiceType = "short answer" | "paragraph" | "date";
type SelectionChoiceType = "multiple choice" | "dropdown" | "checkboxes";

export type Choice = BasicChoiceType | SelectionChoiceType;

interface QuestionBase {
  id: number;
  form_id: number;
  name: string;
}

export interface QuestionBasic extends QuestionBase {
  choice_type: BasicChoiceType;
  choices?: never;
}

export interface QuestionSelection extends QuestionBase {
  choice_type: SelectionChoiceType;
  choices: string[] | string;
}

export type Question = QuestionBasic | QuestionSelection;

export interface GetDetailFormResponse {
  message: string;
  form: FormField & {
    id: number;
    creator_id: number;
    questions: Array<Question & { is_required: 1 | 0 }>;
  };
}

export interface CreateQuestionResponse {
  message: string;
  question: Question & {
    form_id: number;
    is_required: boolean;
  };
}

export interface CreateQuestionRequest
  extends Omit<Question, "id" | "is_required"> {
  is_required: boolean;
}

export interface RemoveQuestionResponse {
  message: string;
}

export interface RemoveQuestionRequest {
  params: {
    form_slug: string;
    question_id: number;
  };
}
