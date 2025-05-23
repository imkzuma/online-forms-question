import {
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  AppBar as MUIAppBar,
  Toolbar,
  Tooltip,
  Typography,
  type AppBarProps,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { Avatar } from "./avatar";
import { Logout } from "@mui/icons-material";
import { Modal } from "./modal";
import { useLogoutMutation } from "../../features/auth/services";

interface Props extends AppBarProps {
  user: string;
}

const Brand = () => (
  <Typography
    variant="h6"
    noWrap
    component="a"
    sx={{
      fontWeight: 700,
      color: "inherit",
      textDecoration: "none",
      flexGrow: 1,
      fontSize: { xs: 16, sm: 20 },
    }}
  >
    YoursAdvisor.
  </Typography>
);

export const AppBar = forwardRef<HTMLDivElement, Props>(function (
  { ...props },
  ref,
) {
  const [logout, { isLoading }] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <MUIAppBar
      position="static"
      ref={ref}
      {...props}
      sx={{
        background: "white",
        boxShadow: "none",
        borderBottom: "1px solid",
        borderColor: "grey.100",
      }}
    >
      <Modal
        title="Logout"
        description="Are you sure want to logout?"
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={async () => {
          await logout().unwrap();
        }}
        loading={isLoading}
      />

      <Box sx={{ px: { xs: 2, md: 5 } }}>
        <Toolbar disableGutters>
          <Brand />

          <Box onClick={handleMenu}>
            <Tooltip title="Open Menu" arrow>
              <Avatar name={props.user} />
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  border: "1px solid",
                  borderColor: "grey.200",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => setOpenModal(true)}
              sx={{ fontSize: 15, width: 200 }}
            >
              <ListItemIcon>
                <Logout sx={{ fontSize: 16 }} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Box>
    </MUIAppBar>
  );
});
