import { Chip, Stack, Typography } from "@mui/material";
import type { GetDetailFormResponse } from "../../../libs/api/schema";

export default function FormTitle(props: GetDetailFormResponse["form"]) {
  const { name, description, allowed_domains } = props;
  return (
    <Stack
      bgcolor={"white"}
      borderRadius={1.5}
      sx={{
        p: 3,
        border: 1,
        borderColor: "grey.200",
        borderTop: 10,
        borderTopColor: "primary.main",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {description}
      </Typography>
      <Stack direction={"row"} spacing={1} alignItems={"center"} pt={3}>
        <Typography color="grey.600" fontSize={14}>
          <strong>Allowed Domains:</strong>
        </Typography>
        {allowed_domains.length > 0
          ? allowed_domains.map((domain) => (
              <Chip key={domain} label={domain} />
            ))
          : "No domains allowed"}
      </Stack>
    </Stack>
  );
}
