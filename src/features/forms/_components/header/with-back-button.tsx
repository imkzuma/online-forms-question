import { ArrowBackIos } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HeaderWithBackButton({
  title,
  backHref,
}: {
  title: string;
  backHref: string;
}) {
  const navigate = useNavigate();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      color={"primary.main"}
      sx={{
        cursor: "pointer",
        width: "fit-content",
      }}
      onClick={() => navigate(backHref)}
    >
      <ArrowBackIos sx={{ fontSize: 16 }} />
      <Typography fontSize={16} fontWeight={"semibold"}>
        {title}
      </Typography>
    </Stack>
  );
}
