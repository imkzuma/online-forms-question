import { Button as MUIButton, type ButtonProps } from "@mui/material";

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <MUIButton fullWidth variant="contained" size="medium" {...props}>
      {children}
    </MUIButton>
  );
};
