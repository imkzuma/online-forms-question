import {
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { showSnackbar } from "../../../components/ui/ui.slice";
import type { GetAllFormResponse } from "../../../libs/api/schema";
import { useAppDispatch } from "../../../utils/hooks/redux";
import { Button } from "../../../components/ui/button";
import { Edit, RemoveRedEyeSharp, Share } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface IListFormData {
  datas: GetAllFormResponse["forms"] | undefined;
  isFetching: boolean;
}

export default function ListFormData({ datas, isFetching }: IListFormData) {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/forms/answer/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      dispatch(
        showSnackbar({
          message: "Link copied to clipboard",
          severity: "info",
        }),
      );
    });
  };

  const handleView = (slug: string) => {
    navigation(`/forms/view/${slug}`);
  };

  const handleEdit = (slug: string) => {
    navigation(`/forms/edit/${slug}`);
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Form Name</TableCell>
            <TableCell>Form Description</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isFetching ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                <CircularProgress size={24} />
                <Typography fontSize={12} mt={2}>
                  Loading Data...
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            datas?.map((form, index) => (
              <TableRow key={form.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{form.name}</TableCell>
                <TableCell>{form.description}</TableCell>
                <TableCell>{form.slug}</TableCell>
                <TableCell>
                  <Stack spacing={1} direction={"row"} justifyContent={"end"}>
                    <Button
                      fullWidth={false}
                      size="small"
                      sx={{ fontSize: 10, color: "white" }}
                      startIcon={<RemoveRedEyeSharp />}
                      onClick={() => handleView(form.slug)}
                    >
                      View
                    </Button>
                    <Button
                      fullWidth={false}
                      size="small"
                      startIcon={<Edit />}
                      sx={{
                        fontSize: 10,
                        color: "white",
                        bgcolor: "primary.600",
                        "&:hover": {
                          backgroundColor: "grey.600",
                        },
                      }}
                      onClick={() => handleEdit(form.slug)}
                    >
                      Edit
                    </Button>
                    <Button
                      fullWidth={false}
                      size="small"
                      sx={{
                        fontSize: 10,
                        color: "primary.600",
                        borderColor: "primary.600",
                        "&:hover": {
                          backgroundColor: "grey.200",
                        },
                      }}
                      variant="outlined"
                      startIcon={<Share />}
                      onClick={() => handleShare(form.slug)}
                    >
                      Share Form
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
