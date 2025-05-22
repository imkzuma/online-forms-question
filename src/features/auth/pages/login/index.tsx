import { Box, Card, CardHeader, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoginForm } from "../../_components/login/form";

const LoginCard = styled(Card)(({ theme }) => ({
  maxWidth: 450,
  margin: "0 auto",
  boxShadow: "none",
  borderRadius: theme.shape.borderRadius * 2,
  overflow: "hidden",
}));

const StyledHeader = styled(CardHeader)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textAlign: "center",
  padding: theme.spacing(4, 2),
}));

export default function MaterialUILoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 8,
        px: 2,
        display: "flex",
        backgroundColor: (theme) => theme.palette.grey[50],
      }}
    >
      <Container maxWidth="sm">
        <LoginCard>
          <StyledHeader
            title={
              <Typography variant="h5" fontWeight="bold">
                Log In
              </Typography>
            }
            subheader={
              <Typography variant="subtitle2" color="primary.light">
                Masuk ke Akun Anda
              </Typography>
            }
          />

          <LoginForm />
        </LoginCard>
      </Container>
    </Box>
  );
}
