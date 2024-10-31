import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { scaleLinear } from 'd3-scale';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";


const HeatMapChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // Define a simple color range for the heatmap cells.
  //const colors = theme.palette.mode === 'dark' ? ['#63be7b', '#f8696b'] : ['#63be7b', '#f8696b'];

  // Define a linear scale to interpolate between red, amber, and green based on value.
  // You may need to adjust the domain based on your actual data values for a more accurate representation.
  const colorScale = scaleLinear()
  .domain([0, 50, 100])
  .range(["red", "orange", "green"]);
 
  const customColorScale = value => {
  if (value === "N/A") return "blue"; // Return grey for "N/A"
    return colorScale(value);
  };

  // Sample data
  const generateData = () => {
    const services = [];
    //const infrastructureComponents = ["Physical", "Virtual", "AWS", "GCP", "Storage", "Database", "Networks"];
    const infrastructureComponents = ["Physical", "IaaS", "PaaS", "CaaS", "AWS", "GCP", "Azure", "Storage", "Database", "Backup", "Unix", "Windows", "Networks"];
  
    for (let i = 1; i <= 1; i++) {
      const serviceData = {
        //id: `Service ${i}`,
        data: infrastructureComponents.map(component => {
          // Introduce "N/A" values randomly
          if (Math.random() < 0.1) { // 10% chance to mark as "N/A"
            return { x: component, y: null };
          }
          let value = Math.floor(Math.random() * 21) + 80; // Mainly 80-100
          if (Math.random() < 0.1) { // 10% chance for outliers
            value = Math.floor(Math.random() * 80); // 0 to 79
          }
          return { x: component, y: value };
        })
      };
      services.push(serviceData);
    }

    return services;
  };
  
  const navigate = useNavigate();

  const handleCellClick = (cell) => {
    if (cell.data.x === "AWS") {
      // Navigate to an external site
      window.open("https://images.app.goo.gl/JrFg4w6JCuGB42UR6", "_blank", "noopener,noreferrer");
    } else {
      navigate(`/${cell.data.x.toLowerCase()}`);
    }  
  };

  const data = generateData();

  return (
    <div style={{ height: '175px', width: '100%'}}>
<ResponsiveHeatMap
  data={data.map(item => ({
    ...item,
    data: item.data.map(d => ({
      x: d.x,
      y: d.y === "N/A" ? "N/A" : d.y, // Preserve "N/A" values
      color: colorScale(d.y) // Apply the color scale to each cell
    }))
  }))}
  margin={{ top: 40, right: 60, bottom: 60, left: 0 }}
  borderRadius={5}
  borderWidth={3}
  borderColor="#eeeded"
  emptyColor="#b3b2b2"
  hoverTarget="cell"
  opacity={0.75}
  activeOpacity={1}
  inactiveOpacity={0.75}
  onClick={handleCellClick}
  axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      truncateTickAt: 0
  }}
  axisRight={null}
  axisLeft={null}
  colors={d => colorScale(d.value)} // Use the color scale for the heatmap cells
  emptyColor="#555555"
  legends={[
      {
          anchor: 'bottom',
          direction: 'row',
          translateX: 0,
          translateY: 60,
          length: 400,
          thickness: 8,
          tickPosition: 'after',
          tickSize: 3,
          tickSpacing: 4,
          tickOverlap: false,
          tickFormat: '>-.2s',
          title: 'Metric Value →',
          titleAlign: 'start',
          titleOffset: 4
      }
  ]}
  tooltip={() => (
    <div
      style={{
        background: 'white',
        padding: '9px 12px',
        border: '1px solid #ccc',
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      Click to view details.
    </div>
  )}
/>
    </div>
  );
};

export default HeatMapChart;