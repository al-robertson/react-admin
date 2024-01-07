import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import api from '../../api'; // Import the axios instance
import useMediaQuery from "@mui/material/useMediaQuery";
//import Header from "../../components/Header";
import ModalHeader from "../../components/ModalHeader";

const Form = ({ onSuccess, editingContact }) => {

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues = {
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    registrarid: "",
  };

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (editingContact) {
      console.log('form status: EDIT', editingContact);
      console.log('Name:', editingContact.name);
      setFormValues({
        name: editingContact.name,
        email: editingContact.email,
        age: editingContact.age.toString(),
        phone: editingContact.phone,
        address: editingContact.address,
        city: editingContact.city,
        zipCode: editingContact.zipCode,
        registrarid: editingContact.registrarId.toString(),
      });
    } //else {
      //console.log('form status: NEW');
      //setFormValues(initialValues);
   // }
  }, [editingContact]);
  
  const handleFormSubmit = async (values) => {
    try {
      const response = await api.post('/contacts', {
        name: values.name,
        email: values.email,
        age: parseInt(values.age, 10),
        phone: values.phone,
        address: values.address,
        city: values.city,
        zipCode: values.zipCode,
        registrarId: parseInt(values.registrarid, 10),
      });
  
      console.log('Successfully created contact:', response.data);
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback
      }
    } catch (error) {
      console.error('Failed to create contact:', error);
      // Additional error handling here
    }
  };   

  const handleFormEdit = async (values) => {
    try {
      const response = await api.put(`/contacts_edit/${editingContact.id}`, {
        name: values.name,
        email: values.email,
        age: parseInt(values.age, 10), // Assuming age needs to be a number
        phone: values.phone,
        address: values.address,
        city: values.city,
        zipCode: values.zipCode,
        registrarId: parseInt(values.registrarid, 10), // Assuming registrarId needs to be a number
      });
  
      console.log('Contact edited:', response.data);
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback
      }
    } catch (error) {
      console.error('Failed to edit contact:', error);
      // Additional error handling here
    }
  };
  

  return (
    <Box m="20px">
      <ModalHeader title={editingContact ? "Update Contact" : "Create New Contact"}
             subtitle={editingContact ? "Update an existing contact profile" : "Create a new contact profile"} />

    <Formik
      onSubmit={(values) => {
      if (editingContact) {
        handleFormEdit(values);
      } else {
        handleFormSubmit(values);
      }
      }}
      initialValues={formValues}
      validationSchema={checkoutSchema}
      enableReinitialize={true} // This is important
    >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address}
                name="address"
                error={!!touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Postcode"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.zipCode}
                name="zipCode"
                error={!!touched.zipCode && !!errors.zipCode}
                helperText={touched.zipCode && errors.zipCode}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="RegistrarID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registrarid}
                name="registrarid"
                error={!!touched.registrarid && !!errors.registrarid}
                helperText={touched.registrarid && errors.registrarid}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
              {editingContact ? "Update Contact" : "Create New Contact"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  age: yup.string().required("required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address: yup.string().required("required"),
  city: yup.string().required("required"),
  zipCode: yup.string().required("required"),
  registrarid: yup.string().required("required"),
});

export default Form;