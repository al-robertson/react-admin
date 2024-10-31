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
import LargeCard from "../../components/LargeCard";
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';

const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box flexGrow={0} /> {/* Spacer element */}
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Customer Portal" subtitle="Welcome to the Customer Portal" />
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
          /*backgroundColor={colors.primary[400]}*/
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CustomCard
            title="Platform Status Dashboard"
            content="Current status across all platforms."
            icon={<InsertChartOutlinedIcon sx={{ fontSize: "40px" }} />}
            navigateTo="/platformdash" // Specify the path to navigate to
          />
        </Box>
        <Box
          gridColumn="span 3"
          /*backgroundColor={colors.primary[400]}*/
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CustomCard
            title="IBS Service Dashboard"
            content="Current status across all IBS Services."
            icon={<InsertChartOutlinedIcon sx={{ fontSize: "40px" }} />}
            navigateTo="/servicedash" // Specify the path to navigate to
          />
        </Box>
        <Box
          gridColumn="span 3"
          /*backgroundColor={colors.primary[400]}*/
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CustomCard
            title="Block Storage Status Dashboard"
            content="Overview of the current array status."
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
    </Box>
  );
};

export default Home;