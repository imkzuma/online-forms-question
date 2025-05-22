import {
  Box,
  Modal as MUIModal,
  Stack,
  Typography,
  type ModalProps,
} from "@mui/material";
import { forwardRef } from "react";
import { Button } from "./button";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400, md: 500 },
  bgcolor: "background.paper",
  borderRadius: 1.5,
  px: 4,
  py: 3,
};

interface Props extends Omit<ModalProps, "children"> {
  title: string;
  description: string;
  onConfirm?: () => void;
  closeLabel?: string;
  confirmLabel?: string;
  onClose?: () => void;
  loading?: boolean;
}

export const Modal = forwardRef<HTMLDivElement, Props>(function (
  { ...props },
  ref,
) {
  return (
    <MUIModal
      ref={ref}
      {...props}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          {props.description}
        </Typography>

        <Stack justifyContent={"flex-end"} direction={"row"} mt={3} spacing={1}>
          <Button
            fullWidth={false}
            sx={{
              backgroundColor: "grey.100",
              color: "grey.500",
              ":hover": {
                backgroundColor: "grey.200",
              },
              fontSize: 12,
            }}
            disabled={props.loading}
            onClick={props.onClose}
          >
            {props.closeLabel || "Cancel"}
          </Button>
          {props.onConfirm && (
            <Button
              fullWidth={false}
              onClick={props.onConfirm}
              loading={props.loading}
              loadingIndicator="Loading..."
            >
              {props.confirmLabel || "Confirm"}
            </Button>
          )}
        </Stack>
      </Box>
    </MUIModal>
  );
});
