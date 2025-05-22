import { Container, Stack } from "@mui/material";
import { AppBar } from "../components/ui/appbar";
import { useAppSelector } from "../utils/hooks/redux";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Stack direction={"column"} minHeight={"100dvh"} width={"100%"}>
      <AppBar user={user.name} />
      <Stack
        direction={"column"}
        flexGrow={1}
        sx={{
          backgroundColor: "grey.50",
        }}
      >
        <Container maxWidth="xl" sx={{ flexGrow: 1, p: 5 }}>
          {children}
        </Container>
      </Stack>
    </Stack>
  );
}
