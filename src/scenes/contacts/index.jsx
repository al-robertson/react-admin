import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, Tooltip } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useTheme } from '@mui/material';
import api from '../../api'; // Import the axios instance
import { tokens } from '../../theme';
import Header from '../../components/Header';
import ContactForm from '../../scenes/form';
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  //const [formData, setFormData] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [editingContact, setEditingContact] = useState(null);

  const fetchContacts = async () => {
    try {
      const response = await api.get('contacts'); 
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  //const handleOpenForm = () => {
  // setIsFormOpen(true);
  //};

  const handleCreateClick = () => {
      setEditingContact(); // Clear any previous edit values
      setIsFormOpen(true); // Open the form modal
    };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    fetchContacts();
  };

  const handleDeleteSelected = async () => {
    await Promise.all(
      selectedRows.map(id => {
        return api.delete(`/contacts_delete/${id}`)
          .then(response => console.log(`Deletion successful for ID: ${id}`, response))
          .catch(error => console.error(`Error deleting contact with ID: ${id}`, error));
      })
    );
    fetchContacts();
  };

  const handleEditClick = (e,row) => {
    e.stopPropagation(); // This prevents the row from being selected
    console.log('About to send:', row);
    setEditingContact(row); // Set the editing contact
    setIsFormOpen(true); // Open the form modal
  };

  const columns = [
    {
      field: 'edit',
      headerName: '',
      renderCell: (params) => (
        <Tooltip title="Edit Record">
        <EditNoteOutlinedIcon
          //onClick={() => handleEditClick(params.row)}
          onClick={(e) => handleEditClick(e, params.row)}
          style={{ cursor: 'pointer' }}
        />
        </Tooltip>
      ),
      sortable: false,
      width: 50,
      align: 'center',
    },
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'registrarId', headerName: 'Registrar ID' },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', type: 'number' },
    { field: 'phone', headerName: 'Phone Number', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'city', headerName: 'City', flex: 1 },
    { field: 'zipCode', headerName: 'Postcode', flex: 1 },
  ];

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Box m="20px">
      <Header title="CONTACTS" subtitle="List of Contacts for Future Reference" />
      <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handleCreateClick} color="secondary">
          Add New Contact
        </Button>
        <Button variant="contained" onClick={handleDeleteSelected} color="error">
          Delete Selected Records
        </Button>
      </Box>
      <Dialog open={isFormOpen} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogContent>
          <ContactForm onSuccess={handleCloseForm} editingContact={editingContact}/>
        </DialogContent>
      </Dialog>
      <Box m="10px 0 0 0" height="75vh" sx={{
        '& .MuiDataGrid-root': { border: 'none' },
        '& .MuiDataGrid-cell': { borderBottom: 'none' },
        '& .name-column--cell': { color: colors.greenAccent[300] },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.blueAccent[700],
          borderBottom: 'none',
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: colors.primary[400],
        },
        '& .MuiDataGrid-footerContainer': {
          borderTop: 'none',
          backgroundColor: colors.blueAccent[700],
        },
        '& .MuiCheckbox-root': {
          color: `${colors.greenAccent[200]} !important`,
        },
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `${colors.grey[100]} !important`,
        },
      }}>
        <DataGrid
          checkboxSelection
          rows={contacts}
          columns={columns}
          //editMode="row"
          //components={{ Toolbar: GridToolbar }}
          slots={{ toolbar: GridToolbar, }}
          onRowSelectionModelChange={(newSelection) => { setSelectedRows(newSelection); }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;