import { Box } from "@mui/material";
import Header from "../../components/Header";
import HeatMapChart from "../../components/custportal/HeatMapChart";

const HeatMap = () => {
  return (
    <Box m="20px">
      <Header title="Heatmap Chart" subtitle="Simple Heatmap Chart" />
      <Box height="75vh">
        <HeatMapChart />
      </Box>
    </Box>
  );
};

export default HeatMap;
