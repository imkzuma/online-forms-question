import { forwardRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField as MUITextField,
  type TextFieldProps,
} from "@mui/material";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function (
  { ...props },
  ref,
) {
  return (
    <MUITextField
      ref={ref}
      fullWidth
      variant="outlined"
      slotProps={{
        input: {
          sx: {
            borderRadius: 2,
            fontSize: "14px",
          },
        },
      }}
      {...props}
    />
  );
});

export const PasswordField = forwardRef<HTMLInputElement, TextFieldProps>(
  function ({ ...props }, ref) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    return (
      <MUITextField
        type={showPassword ? "text" : "password"}
        ref={ref}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? (
                    <VisibilityOff sx={{ fontSize: 18 }} />
                  ) : (
                    <Visibility sx={{ fontSize: 18 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        {...props}
      />
    );
  },
);
