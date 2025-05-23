import {
  Stack,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import { useGetAllResponsesQuery } from "../service";

export default function FormResponse({ formSlug }: { formSlug: string }) {
  const { data, isLoading } = useGetAllResponsesQuery({
    form_slug: formSlug,
  });

  if (isLoading) return "Loading...";

  const responses = data?.responses || [];

  /**
   * Unique questions from all responses
   */
  const uniqueQuestions = Array.from(
    new Set(responses.flatMap((r) => Object.keys(r.answers))),
  );

  return (
    <Stack spacing={2}>
      {responses.length > 0 ? (
        <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell sx={{ textWrap: "nowrap" }}>No</TableCell>
                <TableCell sx={{ textWrap: "nowrap" }}>
                  Respondent Email
                </TableCell>
                <TableCell sx={{ textWrap: "nowrap" }}>
                  Respondent Name
                </TableCell>
                <TableCell sx={{ textWrap: "nowrap" }}>Submitted At</TableCell>
                {uniqueQuestions.map((q, i) => (
                  <TableCell key={i} sx={{ textWrap: "nowrap" }}>
                    {q}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {responses.map((response, index) => (
                <TableRow key={response.user.id}>
                  <TableCell sx={{ textWrap: "nowrap" }}>{index + 1}</TableCell>
                  <TableCell sx={{ textWrap: "nowrap" }}>
                    {response.user.email}
                  </TableCell>
                  <TableCell sx={{ textWrap: "nowrap" }}>
                    {response.user.name}
                  </TableCell>
                  <TableCell sx={{ textWrap: "nowrap" }}>
                    {new Date(response.date).toLocaleString()}
                  </TableCell>
                  {uniqueQuestions.map((q, i) => (
                    <TableCell key={i} sx={{ textWrap: "nowrap" }}>
                      {response.answers[q] ?? "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography
          variant="subtitle2"
          color="text.secondary"
          textAlign="center"
          sx={{ py: 5 }}
        >
          No responses available for this form.
        </Typography>
      )}
    </Stack>
  );
}
