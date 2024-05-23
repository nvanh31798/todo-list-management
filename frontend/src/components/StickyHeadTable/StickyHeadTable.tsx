import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TodoModel } from "../../redux/models/TodoModel";
import { styled, Button } from "@mui/material";
import { TodoStatus } from "../../redux/models/TodoStatus";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  Cell,
} from "@tanstack/react-table";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useCallback, useEffect, useMemo, useRef } from "react";
import moment from "moment";
import { useTodoHelper } from "../../helper/todoHelper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const useSkipper = () => {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
};

const StyledTableHeader = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#52595D",
    color: theme.palette.common.white,
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.subtitle1.fontSize,
    letterSpacing: theme.typography.subtitle1.letterSpacing,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.subtitle2.fontSize,
    letterSpacing: theme.typography.subtitle1.letterSpacing,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface StickyHeadTableProps {
  data: TodoModel[];
  setSelectedJob?: (job: TodoModel) => void;
}

export default function StickyHeadTable({
  data,
  setSelectedJob,
}: StickyHeadTableProps) {
  const { removeTodoItem } = useTodoHelper();
  const navigate = useNavigate();

  const getRemoveButton = (id: number) => {
    return (
      <TableCell>
        <Button onClick={() => removeTodoItem(id)}>
          <DeleteForeverIcon color="error" />
        </Button>
      </TableCell>
    );
  };

  const getEditButton = (id: number) => {
    return (
      <TableCell>
        <Button onClick={() => navigate(`/todo/${id}`)}>
          <EditIcon />
        </Button>
      </TableCell>
    );
  };
  const columns = useMemo<ColumnDef<TodoModel>[]>(
    () => [
      {
        header: "Job",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorKey: "title",
      },
      {
        header: "Stage",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorKey: "project",
      },
      {
        header: "Frame",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorKey: "frame",
      },
      {
        header: "Status",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorKey: "status",
      },
      {
        header: "Start On",
        cell: (info) =>
          moment(info?.getValue() as string)
            .locale("vn")
            .format("LLLL"),
        footer: (props) => props.column.id,
        accessorKey: "startOn",
      },
      {
        header: "Durantion",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorKey: "durantion",
      },
      {
        header: "Assignee",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorKey: "assignee",
      },
      {
        header: "",
        id: "edit",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorKey: "id",
      },
      {
        header: "",
        id: "remove",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        accessorKey: "id",
      },
    ],
    []
  );

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    //
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex: string, columnId: string, value: string) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        // setData((old) =>
        //   old.map((row, index) => {
        //     if (index === rowIndex) {
        //       return {
        //         ...old[rowIndex]!,
        //         [columnId]: value,
        //       };
        //     }
        //     return row;
        //   })
        // );
      },
    },
    debugTable: true,
  });
  const { pageSize, pageIndex } = table.getState().pagination;

  const getStatusTableCell = (cell: Cell<TodoModel, unknown>) => {
    switch (cell.getValue() as TodoStatus) {
      case TodoStatus.NEW:
        return (
          <StyledTableCell key={cell.id}>
            <span className="border-2 p-2 px-3 border-stone-500 rounded-xl text-sm text-stone-400	">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </span>
          </StyledTableCell>
        );
      case TodoStatus.IN_PROGRESS:
        return (
          <StyledTableCell key={cell.id}>
            <span className="border-2 p-2 border-blue-500 rounded-xl text-sm text-blue-500">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </span>
          </StyledTableCell>
        );
      default:
        return (
          <StyledTableCell key={cell.id}>
            <span className="border-2 p-2 border-green-500 rounded-xl text-sm text-green-500">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </span>
          </StyledTableCell>
        );
    }
  };

  const renderCell = (cell: Cell<TodoModel, unknown>) => {
    switch (cell.column.id) {
      case "status":
        return getStatusTableCell(cell);
      case "remove":
        return getRemoveButton(parseInt(cell.getValue() as string));
      case "edit":
        return getEditButton(parseInt(cell.getValue() as string));
      case "title":
        return (
          <TableCell key={cell.id}>
            <Button
              variant="text"
              onClick={() => setSelectedJob?.(cell.row.original)}
            >
              {/* hello */}
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Button>
            {/* {flexRender(cell.column.columnDef.cell, cell.getContext())} */}
          </TableCell>
        );
      default:
        return (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        );
    }
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className="bg-red-500">
            <TableRow>
              {table
                .getHeaderGroups()
                .map((headerGroup) =>
                  headerGroup.headers.map((column) => (
                    <StyledTableHeader key={column.id}>
                      {flexRender(
                        column.column.columnDef.header,
                        column.getContext()
                      )}
                    </StyledTableHeader>
                  ))
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return renderCell(cell);
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPage={pageSize}
        page={pageIndex}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: data.length }]}
        component={"div"}
        count={table.getFilteredRowModel().rows.length}
        onPageChange={(_, page) => {
          table.setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          table.setPageSize(size);
        }}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
}
