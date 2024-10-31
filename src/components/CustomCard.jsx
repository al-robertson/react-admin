import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const CustomCard = ({ title, content, icon, navigateTo }) => {
const navigate = useNavigate();  
const theme = useTheme();
const colors = tokens(theme.palette.mode);

return (
    <Card sx={{ minWidth: 275, 
                height: 200, 
                position: 'relative', 
                ':hover': { boxShadow: 10,},
                backgroundColor: colors.primary[400]  }}>
      <CardContent>
        <Typography variant="h5" color={colors.grey[100]} gutterBottom>
          {title}
        </Typography>
        <Typography color={colors.greenAccent[400]} sx={{ fontSize: 14 }} component="div">
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          sx={{color: "red"}} // Adjust the color as needed
          onClick={() => navigate(navigateTo)} // Use navigate here
        >
          Click to view
        </Button>
      </CardActions>
      {icon && (
        <Box sx={{ color: colors.grey[500], position: 'absolute', bottom: 8, right: 8 }}> 
          {icon}
        </Box>
      )}
    </Card>
  );
};

export default CustomCard;
