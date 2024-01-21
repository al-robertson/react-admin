import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

const LargeCard = ({ content, icon }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Card sx={{ minWidth: 275, 
                minHeight: 200, 
                position: 'relative', 
                ':hover': { boxShadow: 10,},
                backgroundColor: colors.primary[400]  }}> {/* Ensure relative positioning */}
      <CardContent>
        <Typography variant="h3" color={colors.grey[100]} gutterBottom>
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

export default LargeCard;
