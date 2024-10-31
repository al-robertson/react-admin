import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import UnixBarChart from "../../components/custportal/UnixBarChart";
import StatBox from "../../components/StatBox";
import StatList from "../../components/custportal/StatList";
import ProgressCircle from "../../components/ProgressCircle";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const mockIncidents = [
    {
      ticketRef: "INC12345",
      severity: "Sev 3",
      status: "Open",
      date: "04/04 08:10",
      team: "Unix",
      summary: "Kernel failure errors reported for System Y."
    },
    // More incidents...
  ];
  
  const mockChanges = [
    {
      ticketRef: "CHG67890",
      severity: "Cat 2",
      status: "Sched",
      date: "06/04",
      team: "Unix",
      summary: "Scheduled update of System Z"
    },
    {
      ticketRef: "CHG83843",
      severity: "Cat 3",
      status: "Assig",
      date: "10/04",
      team: "Unix",
      summary: "Planned RHEL 9 upgrades to non-prod."
    },
  ];

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Unix Dashboard" subtitle="" />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            RHEL OS Versions
          </Typography>
          <Box height="250px" mt="-20px">
            <UnixBarChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="left"
          justifyContent="left"
          
        >
        <StatList
          title="Current Incidents (sev 1,2,3)"
          rows={mockIncidents}
        />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="left"
          justifyContent="left"
        >
        <StatList
          title="Upcoming Changes (next 7 days)"
          rows={mockChanges}
        />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;