import { Box } from "@mui/material";
import { forwardRef } from "react";

interface Props {
  children: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel = forwardRef<HTMLDivElement, Props>(function (
  { ...props },
  ref,
) {
  const { children, index, value, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-vertical-tabpanel-${index}`}
      aria-labelledby={`full-width-vertical-tab-${index}`}
      ref={ref}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
});
