import React, { useEffect, useState, useMemo } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import mData from "../../data/mockData2.json";
import { Box, Button, Dialog, DialogContent, Tooltip, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { useTheme } from '@mui/material';
import api from '../../api'; // Import the axios instance
import { tokens } from '../../theme';
import Header from '../../components/Header';
import ContactForm from '../form';
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

//const Contacts = () => {
const Contacts = () => {
  /* 
  {
      "id": 1,
      "first_name": "Isador",
      "last_name": "Kruger",
      "email": "ikruger0@huffingtonpost.com",
      "gender": "Male",
      "dob": "2023-04-28T11:19:35Z"
    }
  */

    const data = useMemo(() => mData, [])


    /** @type import('@tanstack/react-table').ColumnDef<any> */
    const columns = [
          {
              header: 'ID',
              accessorKey: 'id',
              footer: 'ID',
          },
          {
              header: 'First Name',
              accessorKey: 'first_name',
              footer: 'First Name',
          },   
          {
              header: 'Last Name',
              accessorKey: 'last_name',
              footer: 'Last Name',
          },   
          {
              header: 'Email',
              accessorKey: 'email',
              footer: 'Email',
          },   
          {
              header: 'Gender',
              accessorKey: 'gender',
              footer: 'Gender',
          },   
          {
              header: 'DOB',
              accessorKey: 'dob',
              footer: 'DOB',
          },   
       ]
  
      const [sorting, setSorting] = useState([])
      const [filtering, setFiltering] = useState('')
    
      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
          sorting: sorting,
          globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
      })
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className="w3-container" m="20px">
      <Header title="CONTACTS" subtitle="Alternative using Tanstack rather than mui datagrid" />
      <TextField
        type="text"
        value={filtering}
        onChange={e => setFiltering(e.target.value)}
        label="Filter"
        variant="outlined"
        size="small"
        margin="normal"
      />
      <Table className="w3-table-all">
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableCell
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <Box display="flex" alignItems="center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: '🔼', desc: '🔽' }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </Box>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="center" m={2}>
        <Button onClick={() => table.setPageIndex(0)} variant="contained">
          First page
        </Button>
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          variant="contained"
        >
          Previous page
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          variant="contained"
        >
          Next page
        </Button>
        <Button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          variant="contained"
        >
          Last page
        </Button>
      </Box>
    </Box>
  );
};

export default Contacts;