import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import Header from "../../components/Header";
import RegionHeader from "../../components/RegionHeader";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import CustomCard from "../../components/CustomCard";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box flexGrow={1} /> {/* Spacer element */}
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <ContactSupportOutlinedIcon sx={{ mr: "10px" }} />
            Contact Us
          </Button>
        </Box>
      </Box>

      {/* ROW 1 */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <RegionHeader title="Favourites" subtitle="Add your favourites here." />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CustomCard
            title="HS Status Dashboard"
            content="Rolled up live status board for all platforms."
            icon={<InsertChartOutlinedIcon sx={{ fontSize: "40px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CustomCard
            title="Block Storage Status Dashboard"
            content="Current array status"
            icon={<InsertChartOutlinedIcon sx={{ fontSize: "40px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CustomCard
            title="Unix Platform Dashboard"
            content="Current status of the Unix estate"
            icon={<SpaceDashboardOutlinedIcon sx={{ fontSize: "40px" }} />}
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <BookmarkAddOutlinedIcon
            sx={{ fontSize: "60px", color: colors.grey[500] }}
          />
          <Typography variant="h6" color={colors.grey[500]} sx={{ mt: 2 }}>
            Add a new favourite
          </Typography>
        </Box>
      </Box>
      {/* ROW 2 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt="40px"
      >
        <RegionHeader
          title="Quick actions"
          subtitle="Let's go...shortcuts to common tasks."
        />
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="240px"
        gap="20px"
      >
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        ></Box>
      </Box>
    </Box>
  );
};

export default Dashboard;