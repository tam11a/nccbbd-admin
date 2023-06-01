import React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  Button,
  Chip,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { usePaginate, useToggle } from "@tam11a/react-use-hooks";
import Create from "./components";
import { useGetAdmin } from "@/queries/mods";
import { FiEdit2 } from "react-icons/fi";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "fullName",
    headerAlign: "center",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    align: "center",
    editable: false,
    valueGetter: (data: GridValueGetterParams) =>
      `${data?.row?.firstName || ""} ${data?.row?.lastName || ""}`,
  },
  {
    field: "email",
    headerAlign: "center",
    headerName: "Email",
    align: "center",
    flex: 1,
    renderCell: (data: any) =>
      data?.row?.email ? <Chip label={data?.row?.email} /> : "-",
    editable: false,
    sortable: false,
  },
  {
    field: "username",
    headerAlign: "center",
    headerName: "Username",
    align: "center",
    flex: 1,
    renderCell: (data: any) =>
      data?.row?.username ? <Chip label={data?.row?.username} /> : "-",
    editable: false,
    sortable: false,
  },
  {
    headerName: "Action",
    field: "action",
    width: 80,
    minWidth: 60,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (data: any) => (
      <>
        <IconButton
          sx={{ fontSize: "large" }}
          color="primary"
          // onClick={() => navigate(`/app/admin/${data.row?.id}`)}
        >
          <FiEdit2 />
        </IconButton>
      </>
    ),
  },
];

const Mods: React.FC = () => {
  const { limit, setLimit, page, setPage, getQueryParams } =
    usePaginate();
  const { data, isLoading } = useGetAdmin(getQueryParams());
  const { state, toggleState } = useToggle(false);

  return (
    <Box sx={{ height: 400, width: "100%" }} className="gap-4">
      <Container
        maxWidth={"lg"}
        sx={{
          maxWidth: "1500px !important",
        }}
      >
        <Grid container rowGap={2} direction="column" marginTop={4}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              {/* <BackButton /> */}
              <Typography variant="subtitle1" fontWeight={700}>
                Moderators
              </Typography>
            </div>
            <Button
              className="w-1/6 my-2"
              variant="contained"
              onClick={() => toggleState()}
            >
              Add New Admin
            </Button>
          </Grid>

          <Create open={state} onClose={toggleState} />
        </Grid>
      </Container>
      <DataGrid
        loading={isLoading}
        rows={data?.data || []}
        columns={columns}
        disableSelectionOnClick
        rowCount={data?.total || 0}
        page={page}
        paginationMode={"server"}
        onPageChange={setPage}
        pageSize={limit}
        onPageSizeChange={setLimit}
        // disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Mods;
