import * as Yup from "yup";

export type LoginSchema = Yup.InferType<typeof loginSchema>;

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});
