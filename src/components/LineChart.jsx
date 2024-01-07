import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from "@nivo/line";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens, chartTheme } from "../theme";
import api from '../api'; 

const LineChart = ({ isCustomLineColors = false, isDashboard = false }) => {
  const [lineChartData, setLineChartData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/transportrevenue');
 
        setTotalRevenue(response.data.total_revenue);   // Set the total revenue
    
        const seriesMap = response.data.records.reduce((acc, { country, category, value }) => {
          if (!acc[country]) {
            acc[country] = {
              id: country,
              data: []
            };
          }
          acc[country].data.push({ x: category, y: value });
          return acc;
        }, {});

        setLineChartData(Object.values(seriesMap));
      } catch (error) {
        console.error('Error fetching line chart data:', error);
      }

    };
console.log(chartTheme);
    fetchData();
  }, []);

  return (
    <>
        <Box sx={{ paddingLeft: '30px' }}>
        <Typography
            variant="h5"
            fontWeight="600"
            color={colors.grey[100]}
        >
        Revenue Generated
        </Typography>
        <Typography
            variant="h3"
            fontWeight="bold"
            color={colors.greenAccent[500]}
        >
        {totalRevenue}
        </Typography>
        </Box>   
        <ResponsiveLine
          data={lineChartData}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: colors.grey[100],
                },
              },
              legend: {
                text: {
                  fill: colors.grey[100],
                },
              },
              ticks: {
                line: {
                  stroke: colors.grey[100],
                  strokeWidth: 1,
                },
                text: {
                  fill: colors.grey[100],
                },
              },
            },
            legends: {
              text: {
                fill: colors.grey[100],
              },
            },
            tooltip: {
              container: {
                color: colors.primary[500],
              },
            },
          }}
          margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 0,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "transportation", // added
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickValues: 5, // added
            tickSize: 3,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : "count", // added
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={8}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          colors={ chartTheme(theme.palette.mode) } 
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </>
      );
    };
    

export default LineChart;