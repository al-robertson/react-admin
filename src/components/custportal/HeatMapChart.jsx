import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { scaleLinear } from 'd3-scale';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";


const HeatMapChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [franchise, setFranchise] = useState('');
  const [domain, setDomain] = useState('');

  const handleFranchiseChange = (event) => {
    setFranchise(event.target.value);
  };

  const handleDomainChange = (event) => {
    setDomain(event.target.value);
  };

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
    const infrastructureComponents = ["Physical", "Virtual", "AWS", "GCP", "Storage", "Database", "Networks"];
  
    for (let i = 1; i <= 10; i++) {
      const serviceData = {
        id: `Service ${i}`,
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
  
  const data = generateData();

  return (

    <div style={{ height: '500px', width: '100%'}}>
      <Formik
        initialValues={{ franchise: '', domain: '' }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, setFieldValue }) => (
        <Form>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
              <FormControl fullWidth>
                <InputLabel id="franchise-label">Franchise</InputLabel>
                <Field
                  component={Select}
                  name="franchise"
                  labelId="franchise-label"
                  id="franchise"
                  value={values.franchise}
                  onChange={(event) => setFieldValue('franchise', event.target.value)}
                  label="Franchise"
                >
                  <MenuItem value={10}>Franchise A</MenuItem>
                  <MenuItem value={20}>Franchise B</MenuItem>
                </Field>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="domain-label">Domain</InputLabel>
                <Field
                  component={Select}
                  name="domain"
                  labelId="domain-label"
                  id="domain"
                  value={values.domain}
                  onChange={(event) => setFieldValue('domain', event.target.value)}
                  label="Domain"
                >
                  <MenuItem value={10}>Domain X</MenuItem>
                  <MenuItem value={20}>Domain Y</MenuItem>
                </Field>
              </FormControl>

              <FormGroup sx={{ minWidth: 160 }}>
                <FormControlLabel
                  control={<Field component={Checkbox} name="redOnly" type="checkbox" />}
                  label="Reds Only"
                />
              </FormGroup>

            </Box>
        </Form>
        )}
      </Formik>

    <ResponsiveHeatMap
      data={data.map(item => ({
        ...item,
        data: item.data.map(d => ({
          x: d.x,
          y: d.y === "N/A" ? "N/A" : d.y, // Preserve "N/A" values
          color: colorScale(d.y) // Apply the color scale to each cell
        }))
      }))}
      margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
      borderRadius={5}
      borderWidth={3}
      borderColor="#eeeded"
      emptyColor="#b3b2b2"
      hoverTarget="cell"
      opacity={0.75}
      activeOpacity={1}
      inactiveOpacity={0.75}
      //valueFormat=">-.2s"
      axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          truncateTickAt: 0
      }}
      axisRight={null}
      axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          truncateTickAt: 0
      }}
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
    />
    </div>
  );
};

export default HeatMapChart;