import { WarningAmber } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export default function FormLimitResponse({
  isLimitOneResponse,
}: {
  isLimitOneResponse: boolean;
}) {
  if (!isLimitOneResponse) return null;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      bgcolor={"#f8d7da"}
      border={1}
      borderColor={"#f5c2c7"}
      color={"#842029"}
      borderRadius={1}
      sx={{ p: 2 }}
    >
      <WarningAmber fontSize="large" />
      <Typography fontWeight="bold" fontSize={14}>
        This form can only be answered once per user. Please make sure your
        answers are final before submitting.
      </Typography>
    </Stack>
  );
}
