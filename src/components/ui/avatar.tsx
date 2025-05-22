import {
  Avatar as MUIAvatar,
  Stack,
  Typography,
  type AvatarProps,
} from "@mui/material";
import { forwardRef } from "react";

interface Props extends AvatarProps {
  name: string;
}

export const Avatar = forwardRef<HTMLDivElement, Props>(function (
  { ...props },
  ref,
) {
  const aliasesName = props.name.slice(0, 1);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        py: 0.5,
        px: 2,
        gap: 2,
        cursor: "pointer",
        ":hover": {
          backgroundColor: "grey.50",
          borderRadius: 1,
        },
      }}
    >
      <Typography color="grey.500" fontSize={14}>
        {props.name}
      </Typography>
      <MUIAvatar
        ref={ref}
        {...props}
        sx={{
          width: 30,
          height: 30,
          backgroundColor: "primary.main",
        }}
      >
        {aliasesName}
      </MUIAvatar>
    </Stack>
  );
});
