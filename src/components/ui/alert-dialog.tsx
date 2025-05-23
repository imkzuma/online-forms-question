import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import {
  CheckCircle,
  Error as ErrorIcon,
  Info,
  Warning,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import { hideModal } from "./ui.slice";
import { Button } from "./button";

const iconMap = {
  success: <CheckCircle color="success" sx={{ fontSize: 70 }} />,
  error: <ErrorIcon color="error" sx={{ fontSize: 70 }} />,
  warning: <Warning color="warning" sx={{ fontSize: 70 }} />,
  info: <Info color="info" sx={{ fontSize: 70 }} />,
};

export default function GlobalAlertDialog() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const ui = useAppSelector((state) => state.ui);

  const handleClose = () => {
    dispatch(hideModal());
    if (ui.modal.href) {
      navigate(ui.modal.href, { replace: true });
    }
  };

  return (
    <Dialog
      open={ui.modal.open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            px: 1,
            pb: 0.5,
          },
        },
      }}
    >
      <DialogTitle textAlign={"center"} sx={{ pt: 5 }}>
        <Box>{iconMap[ui.modal.type]}</Box>
      </DialogTitle>
      <DialogContent sx={{ pb: 5 }}>
        <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
          <Typography variant="h6">{ui.modal.title}</Typography>
          <Typography variant="body2" color="grey.500">
            {ui.modal.message}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ bgcolor: "grey.200" }}
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
