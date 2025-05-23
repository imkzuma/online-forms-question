import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack
      width={"100%"}
      flex={1}
      minHeight={"75dvh"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={2}
    >
      <CircularProgress color="primary" />
      <span>Loading...</span>
    </Stack>
  );
}
