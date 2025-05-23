import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type GetDetailFormResponse,
  type GetAllFormResponse,
  type CreateFormResponse,
  type CreateFormRequest,
  type CreateQuestionRequest,
  type CreateQuestionResponse,
  type RemoveQuestionResponse,
  type RemoveQuestionRequest,
  type AnswerQuestionResponse,
  type AnswerQuestionRequest,
  type GetAllAnswersResponse,
} from "../../libs/api/schema";
import { baseQuery } from "../../libs/api";
import { showModal, showSnackbar } from "../../components/ui/ui.slice";
import { removeDeletedQuestionId } from "./slice";

export const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery,
  tagTypes: ["forms", "form", "questions", "responses"],
  endpoints: (builder) => ({
    getAllForms: builder.query<GetAllFormResponse, void>({
      query: () => ({
        url: "/forms",
        method: "GET",
      }),
      providesTags: ["forms"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          dispatch(
            showSnackbar({
              message: "Failed to fetch forms",
              severity: "error",
            }),
          );
        }
      },
    }),
    getFormBySlug: builder.query<GetDetailFormResponse, { form_slug: string }>({
      query: ({ form_slug }) => ({
        url: `/forms/${form_slug}`,
        method: "GET",
      }),
      providesTags: ["form", "questions"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // @ts-expect-error false type
          const code = error?.error?.data?.code as unknown as number;

          if (code === 403) {
            dispatch(
              showModal({
                title: "Forbidden Access",
                message: "You are not allowed to access this form",
                type: "error",
                href: "/forms",
              }),
            );
          }
        }
      },
    }),
    createForm: builder.mutation<CreateFormResponse, CreateFormRequest>({
      query: (body) => ({
        url: "/forms",
        method: "POST",
        body,
      }),
      invalidatesTags: ["forms", "form"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            showSnackbar({
              message: "Form created successfully",
              severity: "success",
            }),
          );
        } catch {
          dispatch(
            showSnackbar({
              message: "Failed to create form",
              severity: "error",
            }),
          );
        }
      },
    }),
    addQuestion: builder.mutation<
      CreateQuestionResponse,
      { data: CreateQuestionRequest; form_slug: string }
    >({
      query: ({ form_slug, data }) => ({
        url: `/forms/${form_slug}/questions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["questions"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            showSnackbar({
              message: "Question added successfully to form",
              severity: "success",
            }),
          );
        } catch {
          dispatch(
            showSnackbar({
              message: "Failed to add question",
              severity: "error",
            }),
          );
        }
      },
    }),
    deleteQuestion: builder.mutation<
      RemoveQuestionResponse,
      RemoveQuestionRequest["params"]
    >({
      query: ({ form_slug, question_id }) => ({
        url: `/forms/${form_slug}/questions/${question_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["questions"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(removeDeletedQuestionId(arg.question_id));
          dispatch(
            showSnackbar({
              message: "Question deleted successfully",
              severity: "success",
            }),
          );
        } catch {
          dispatch(
            showSnackbar({
              message: "Failed to delete question",
              severity: "error",
            }),
          );
        }
      },
    }),
    answerQuestion: builder.mutation<
      AnswerQuestionResponse,
      {
        data: AnswerQuestionRequest;
        form_slug: string;
      }
    >({
      query: ({ form_slug, data }) => ({
        url: `/forms/${form_slug}/responses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["responses"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            showModal({
              title: "Form submitted successfully",
              message: "Thank you for your response",
              type: "success",
              href: "/forms",
            }),
          );
        } catch (error) {
          // @ts-expect-error: API error typing not precise
          const code = error?.error?.data?.code as unknown as number;

          let title = "Failed to submit form";
          let message = "Failed to submit form";

          if (code === 422) {
            title = "Form already submitted";
            message = "You have already submitted this form";
          }

          dispatch(
            showModal({
              title,
              message,
              type: "error",
              href: "/forms",
            }),
          );
        }
      },
    }),
    getAllResponses: builder.query<
      GetAllAnswersResponse,
      { form_slug: string }
    >({
      query: ({ form_slug }) => ({
        url: `/forms/${form_slug}/responses`,
        method: "GET",
      }),
      providesTags: ["responses"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // @ts-expect-error false type
          const message = error?.error?.data?.message as unknown as string;

          dispatch(
            showSnackbar({
              message: message || "Failed to fetch responses",
              severity: "error",
            }),
          );
        }
      },
    }),
  }),
});

export const {
  useGetAllFormsQuery,
  useGetFormBySlugQuery,
  useCreateFormMutation,
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useAnswerQuestionMutation,
  useGetAllResponsesQuery,
} = formsApi;
