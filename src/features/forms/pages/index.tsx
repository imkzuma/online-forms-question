import { Divider, Stack } from "@mui/material";
import Header from "../_components/header";
import { useGetAllFormsQuery } from "../service";
import ListFormData from "../_components/list-form";

export default function FormsPage() {
  const { data, isFetching, refetch } = useGetAllFormsQuery();

  return (
    <Stack spacing={2}>
      <Header refetch={refetch} />
      <Divider />
      <ListFormData isFetching={isFetching} datas={data?.forms} />
    </Stack>
  );
}
