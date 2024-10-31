import { Box, useTheme, Typography, Paper } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import MuiCarousel from "../../components/Carousel";
import HeatMapHeader from "../../components/custportal/HeatMapHeader";
import StatList from "../../components/custportal/StatList";
import StatBox from "../../components/StatBox";
import StorageIcon from "@mui/icons-material/Storage";


// Define a function to format dates for display
const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', month: 'long', day: 'numeric', 
    hour: 'numeric', minute: 'numeric', second: 'numeric', 
    hour12: true 
  }).format(new Date(date));
};

const PlatformServiceDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  // Sample items with dates, names, and summaries
  const carouselItems = [
  { 
    date: "2024-04-03T09:30:00Z",
    name: "Team Alpha / Platform X",
    summary: "Overnight deployment successful, completed on time and no issues raised this morning."
  },
  { 
    date: "2024-04-05T16:45:00Z",
    name: "Team Beta / Platform Y",
    summary: "Urgent: Database connectivity issues reported, sev 2 incident record INCxxxx raised, root cause under investigation. "
  },
  { 
    date: "2024-04-06T09:20:00Z",
    name: "Team Gamma / Platform Z",
    summary: "Planned scheduled maintenance upcoming at 06/04 2200 hours, stakeholders have been informed and the change record is scheduled."
  },
  ].map(item => ({
    content: (
    <Box mb={2}> {/* Adds bottom margin to the entire box */}
      <Typography variant="subtitle2" variant="h6" color={colors.redAccent[400]}>
        {formatDate(item.date)}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {item.name}
      </Typography>
      <Typography variant="body1" mb={2}> {/* Adjust mb value as needed for the blank line */}
        {item.summary}
      </Typography>
    </Box>
   )
}));

const mockIncidents = [
  {
    ticketRef: "INC12345",
    severity: "Sev 2",
    status: "Open",
    date: "04/04 08:10",
    team: "Oracle",
    summary: "Database connectivity issues."
  },
  // More incidents...
];

const mockChanges = [
  {
    ticketRef: "CHG67890",
    severity: "Cat 2",
    status: "Sched",
    date: "06/04",
    team: "Oracle",
    summary: "Scheduled update of System X"
  },
  {
    ticketRef: "CHG83843",
    severity: "Cat 3",
    status: "Assig",
    date: "10/04",
    team: "Windows",
    summary: "Planned April security patching."
  },
];

  return (
  <Box m="20px"> {/* Container for the entire dashboard */}
    <Header title="Platform Service Dashboard" subtitle="Showing an overview of current status across platforms." />
    <Box display="flex" flexDirection="column" gap={1}>
      <MuiCarousel items={carouselItems} />
      <HeatMapHeader />
    </Box>
    {/* Container for the dashboard grid*/}
    <Box
        display="grid"
        gridTemplateColumns="repeat(14, 1fr)"
        gridAutoRows="100px"
        gap="20px"
    >
        {/* ROW 2 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="640,000 kg "
            subtitle="Carbon reduction YTD"
            progress="0.90"
            increase="-7%"
            icon={<StorageIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }}/>}
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,221"
            subtitle="On-prem decoms"
            progress="0.50"
            increase="-11%"
            icon={
              <StorageIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="521"
            subtitle="App migrations"
            progress="0.30"
            increase="9%"
            icon={
              <StorageIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,134"
            subtitle="Switch replacements"
            progress="0.80"
            increase="56%"
            icon={
              <StorageIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 7"
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
          gridColumn="span 7"
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
  
  export default PlatformServiceDashboard;