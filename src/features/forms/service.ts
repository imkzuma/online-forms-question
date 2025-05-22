import { createApi } from "@reduxjs/toolkit/query/react";
import {
  type GetDetailFormResponse,
  type GetAllFormResponse,
  type CreateFormResponse,
  type CreateFormRequest,
  type CreateQuestionRequest,
  type CreateQuestionResponse,
} from "../../libs/api/schema";
import { baseQuery } from "../../libs/api";
import { showSnackbar } from "../../components/ui/ui.slice";

export const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllForms: builder.query<GetAllFormResponse, void>({
      query: () => ({
        url: "/forms",
        method: "GET",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
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
    }),
    createForm: builder.mutation<CreateFormResponse, CreateFormRequest>({
      query: (body) => ({
        url: "/forms",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          console.log(data);
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
  }),
});

export const {
  useGetAllFormsQuery,
  useGetFormBySlugQuery,
  useCreateFormMutation,
  useAddQuestionMutation,
} = formsApi;
