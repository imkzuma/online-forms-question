import { Box, Stack, Typography } from "@mui/material";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Stack spacing={0.5} textAlign={"center"} mb={5}>
        <Typography
          variant="h1"
          fontWeight={"bold"}
          color="primary"
          letterSpacing={8}
        >
          404
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you’re looking for doesn’t exist.
        </Typography>
      </Stack>
      <Button
        fullWidth={false}
        onClick={() => navigate("/forms", { replace: true })}
      >
        Back Home
      </Button>
    </Box>
  );
}
