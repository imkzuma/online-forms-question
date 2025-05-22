import { Box } from "@mui/material";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box minHeight={"100dvh"} sx={{ backgroundColor: "grey.50" }}>
      <Box pt={10}>{children}</Box>
    </Box>
  );
}
