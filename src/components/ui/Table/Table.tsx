import { useCallback, useEffect, useState } from "react";
import {
  DataGrid,
  getGridNumericOperators,
  GridCallbackDetails,
  GridColDef,
  GridColumnMenu,
  GridColumnMenuProps,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
} from "@mui/x-data-grid";
import Link from "next/link";
import { Box, Button } from "@mui/material";
import { dateFormatter } from "@/helpers/dateHelpers";
import { emailFormatter } from "@/helpers/textHelpers";
import { IJoke } from "@/models/Joke";
import { getJokesWithParams } from "@/services/jokeService";
import { useTheme } from "@mui/system";

const filterOperators = getGridNumericOperators().filter(
  (operator) => operator.value === "="
);

const columns: GridColDef[] = [
  {
    field: "Title",
    headerName: "Title",
    headerAlign: "center",
    align: "center",
    flex: 1,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params: GridRenderCellParams<IJoke>) => (
      <Link href={`/${params.row.id}`}>{params.row.Title}</Link>
    ),
  },
  {
    field: "Author",
    headerName: "Author",
    headerAlign: "center",
    align: "center",
    flex: 1,
    filterable: false,
    disableColumnMenu: true,
    valueFormatter: (params) => emailFormatter(params.value),
  },
  {
    field: "CreatedAt",
    headerName: "Created Date",
    headerAlign: "center",
    align: "center",
    flex: 1,
    type: "dateTime",
    filterOperators,
    valueFormatter: (params) => dateFormatter(params.value),
    valueGetter: (params) => dateFormatter(params.value),
  },
  {
    field: "Views",
    headerName: "Views",
    headerAlign: "center",
    align: "center",
    type: "number",
    flex: 1,
    filterOperators,
    renderCell: (params) => renderViewsCell(Number(params.value)),
  },
];

function CustomColumnMenu(props: GridColumnMenuProps) {
  return <GridColumnMenu {...props} slots={{ columnMenuColumnsItem: null }} />;
}

const renderViewsCell = (value: number) => {
  switch (true) {
    case value > 0 && value <= 25:
      return (
        <Box component="span" color="tomato">
          {value}
        </Box>
      );
    case value > 25 && value <= 50:
      return (
        <Box component="span" color="orange">
          {value}
        </Box>
      );
    case value > 50 && value <= 75:
      return (
        <Box component="span" color="yellow">
          {value}
        </Box>
      );
    case value > 75 && value <= 100:
      return (
        <Box component="span" color="green">
          {value}
        </Box>
      );
    default:
      return <Box component="span">{value}</Box>;
  }
};

const Table = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [filterParams, setFilter] = useState<GridFilterModel>(
    {} as GridFilterModel
  );
  const [sortParams, setSort] = useState<GridSortModel>({} as GridSortModel);

  useEffect(() => {
    const params = new URLSearchParams({
      _page: page,
      _limit: pageSize,
      ...(filterParams?.items?.length && {
        [filterParams.items[0].field]: filterParams.items[0].value,
      }),
      ...(sortParams.length && {
        _sort: sortParams[0].field,
        _order: sortParams[0].sort,
      }),
    });

    setLoading(true);
    getJokesWithParams(params).then((response) => {
      setData(response[0]);
      setTotal(response[1]);
      setLoading(false);
    });
  }, [page, pageSize, filterParams, sortParams]);

  const onPaginationModelChange = useCallback((model: GridPaginationModel) => {
    setPage(model.page + 1);
    setPageSize(model.pageSize);
  }, []);

  const onFilterModelChange = useCallback(
    (model: GridFilterModel, details: GridCallbackDetails) => {
      if (!details.reason) return;
      setFilter(model);
    },
    []
  );

  const onSortModelChange = useCallback((model: GridSortModel) => {
    setSort(model);
  }, []);

  return (
    <Box>
      <Button size="small" variant="contained">
        <Link href="/new-joke"> Add new joke</Link>
      </Button>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-cell:not(:last-child), & .MuiDataGrid-columnHeader:not(:last-child)":
              {
                borderRight: `1px solid ${
                  theme.palette.mode === "light"
                    ? "rgba(224, 224, 224, 1)"
                    : "rgba(81, 81, 81, 1)"
                }`,

                paddingX: 8,
              },
            "&  .MuiDataGrid-iconSeparator": {
              display: "none",
            },
          }}
          slots={{ columnMenu: CustomColumnMenu }}
          autoHeight
          rowCount={total}
          columns={columns}
          rows={data}
          rowSpacingType="border"
          loading={loading}
          pagination
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          page={page - 1}
          paginationMode="server"
          filterMode="server"
          sortingMode="server"
          onFilterModelChange={onFilterModelChange}
          onSortModelChange={onSortModelChange}
          pageSize={pageSize}
          onPaginationModelChange={onPaginationModelChange}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 5,
              },
            },
          }}
        />
      </div>
    </Box>
  );
};

export default Table;
