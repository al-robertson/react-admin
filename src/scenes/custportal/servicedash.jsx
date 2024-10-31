import { Box } from "@mui/material";
import Header from "../../components/Header";
import HeatMapChart from "../../components/custportal/HeatMapChart";

const ServiceHeatMap = () => {
  return (
    <Box m="20px">
      <Header title="Service Health Dashboard" subtitle="Showing overview of current status across IBS applications." />
      <Box height="75vh">
        <HeatMapChart />
      </Box>
    </Box>
  );
};

export default ServiceHeatMap;
