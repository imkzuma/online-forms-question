import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Login } from "@mui/icons-material";
import { loginSchema, type LoginSchema } from "../../../../libs/yup/auth";
import { Stack, TextField } from "@mui/material";
import { PasswordField } from "../../../../components/ui/field";
import { Button } from "../../../../components/ui/button";
import { useLoginMutation } from "../../services";

export const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginSchema) => {
    await login(data).unwrap();
  };

  return (
    <>
      <Stack
        component={"form"}
        p={4}
        spacing={3}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Email"
          type="email"
          placeholder="nama@contoh.com"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <PasswordField
          label="Kata Sandi"
          placeholder="Masukkan kata sandi Anda"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          startIcon={<Login />}
          disabled={!isValid}
          loading={isLoading}
          loadingIndicator="Loading..."
        >
          Masuk
        </Button>
      </Stack>
    </>
  );
};
