import React, { useEffect, useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import mData from "../../data/mockData2.json";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TableRow,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material";
import api from "../../api";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ContactForm from "../form";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

const csvConfig = mkConfig({
  fieldSeparator: ",",
  decimalSeparator: ".",
  useKeysAsHeaders: true,
});

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get('contacts'); 
      setData(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  /** @type import('@tanstack/react-table').ColumnDef<any> */
  const columns = [
    { header: "ID", accessorKey: "id", footer: "ID" },
    { header: "Registrar ID", accessorKey: "registrarId", footer: "Registrar ID" },
    { header: "Name", accessorKey: "name", footer: "Name" },
    { header: "Age", accessorKey: "age", footer: "Age" },
    { header: "Phone Number", accessorKey: "phone", footer: "Phone Number" },
    { header: "Email", accessorKey: "email", footer: "Email" },
    { header: "Address", accessorKey: "address", footer: "Address" },
    { header: "City", accessorKey: "city", footer: "City" },
    { header: "Postcode", accessorKey: "zipCode", footer: "Postcode" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  //DELETE action
  const openDeleteConfirmModal = (row: MRT_Row<User>) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      //INSERT DELETE API CALL HERE
    }
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableRowSelection: true,
    enableEditing: true,
    editDisplayMode: 'modal',
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiTableContainerProps: { sx: { maxHeight: "800px" } },
    defaultColumn: { minSize: 20, maxSize: 1000, size: 100, },
    muiTableHeadRowProps: {
      sx: (theme) => ({
        backgroundColor: colors.blueAccent[700],
      }),
    },
    muiTableFooterRowProps: {
      sx: (theme) => ({
        backgroundColor: colors.blueAccent[700],
      }),
    },
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
          mr: '100px',
          width: 'auto'
        }}
      >
        <Button
          variant="outlined"
          color="info"
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          variant="outlined"
          color="info"
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export Report Rows
        </Button>
        <Button
          variant="outlined"
          color="info"
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
    onEditingRowSave: ({ table, values }) => {
      //validate data
      //save data to api
      table.setEditingRow(null); //exit editing mode
    },
    onEditingRowCancel: () => {
      //clear any validation errors
    },
    muiEditRowDialogProps: {
      //optionally customize the dialog
    },
    renderEditRowDialogContent: ({ internalEditComponents, row, table }) => {
      //optionally, completely override the render of the dialog content
      //use `internalEditComponents` to render the generated text fields, or completely render your own form and inputs
    },
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  });

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="Alternative using Material React Table (mui + Tanstack combined)"
      />
      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <MaterialReactTable table={table} />
      </Box>
    </Box>
  );
};

export default Contacts;
