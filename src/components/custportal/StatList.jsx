import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const StatList = ({ title, rows }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <Typography
        variant="h5"
        fontWeight="600"
        color={colors.grey[100]} 
        p="15px"
        borderBottom={`4px solid ${colors.primary[500]}`}
      >
        {title}
      </Typography>

      {/* Column Headings */}
      <Grid container spacing={2} alignItems="center" p="15px" color={colors.grey[100]}>
        <Grid item xs={2}><Typography variant="h6" fontWeight="600" color={colors.grey[100]}></Typography></Grid>
        <Grid item xs={2}><Typography variant="h6" fontWeight="600" color={colors.grey[100]}></Typography></Grid>
        <Grid item xs={1}><Typography variant="h6" fontWeight="600" color={colors.grey[100]}></Typography></Grid>
        <Grid item xs={2}><Typography variant="h6" fontWeight="600" color={colors.grey[100]}></Typography></Grid>
        <Grid item xs={2}><Typography variant="h6" fontWeight="600" color={colors.grey[100]}>Team</Typography></Grid>
        <Grid item xs={3} sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}><Typography variant="h6" fontWeight="600" color={colors.grey[100]}>Summary</Typography></Grid>
      </Grid>

      {/* Rows of Data */}
      {rows.map((row, index) => (
        <Grid container spacing={2} alignItems="left" p="15px" key={index} borderBottom={`1px solid ${colors.grey[300]}`}>
          <Grid item xs={2}><Typography color={colors.blueAccent[500]}>{row.ticketRef}</Typography></Grid>
          <Grid item xs={2}><Typography color={colors.grey[100]}>{row.severity}</Typography></Grid>
          <Grid item xs={1}><Typography color={colors.grey[100]}>{row.status}</Typography></Grid>
          <Grid item xs={2}><Typography color={colors.grey[100]}>{row.date}</Typography></Grid>
          <Grid item xs={2}><Typography color={colors.grey[100]}>{row.team}</Typography></Grid>
          <Grid item xs={3} sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}><Typography color={colors.grey[100]}>{row.summary}</Typography></Grid>
        </Grid>
      ))}
    </div>
  );
};

export default StatList;