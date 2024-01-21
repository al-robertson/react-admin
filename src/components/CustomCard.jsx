// CustomCard.js

import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const CustomCard = ({ title, content, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ minWidth: 275, position: 'relative', backgroundColor: colors.primary[400]  }}> {/* Ensure relative positioning */}
      <CardContent>
        <Typography variant="h5" color={colors.grey[100]} gutterBottom>
          {title}
        </Typography>
        <Typography color={colors.greenAccent[400]} sx={{ fontSize: 14 }} component="div">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{color: colors.redAccent[400]}}>Click to view</Button>
      </CardActions>
      {icon && (
        <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}> 
          {icon}
        </Box>
      )}
    </Card>
  );
};

export default CustomCard;
