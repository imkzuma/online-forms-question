import { Stack, Typography } from "@mui/material";
import { Button } from "../../../../components/ui/button";
import { Add, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Header({ refetch }: { refetch: () => void }) {
  const navigate = useNavigate();

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"end"}
    >
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight={"bold"}>
          Forms
        </Typography>
        <Typography fontSize={15} color="grey.500">
          All of your created form templates will be listed here.
        </Typography>
      </Stack>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Button
          fullWidth={false}
          startIcon={<Add />}
          sx={{
            bgcolor: "primary.600",
            color: "white",
            fontSize: 12,
          }}
          onClick={() => navigate("/forms/create")}
        >
          Create New
        </Button>
        <Button
          fullWidth={false}
          sx={{
            bgcolor: "grey.200",
            "&:hover": {
              backgroundColor: "grey.300",
            },
            fontSize: 12,
          }}
          onClick={refetch}
          startIcon={<Refresh />}
        >
          Refresh
        </Button>
      </Stack>
    </Stack>
  );
}
