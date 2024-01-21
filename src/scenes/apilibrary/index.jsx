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
import ForestOutlinedIcon from '@mui/icons-material/ForestOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LanOutlinedIcon from '@mui/icons-material/LanOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const APILibrary = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="API Library" subtitle="Welcome to the API Library" />
      </Box>
      {/* ROW 1 */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <RegionHeader title="Sustainability" subtitle="View All (3)" />
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
            title="Climate Dashboard"
            content="Total carbon by franchise, domain or application."
            icon={<ForestOutlinedIcon sx={{ fontSize: "40px" }} />}
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
            title="VMware vROps"
            content="Infrastructure carbon footprint & righ-size data."
            icon={<ForestOutlinedIcon sx={{ fontSize: "40px" }} />}
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
            title="Google Cloud (GCP)"
            content="Carbon footprint for GCP hosted applications"
            icon={<ForestOutlinedIcon sx={{ fontSize: "40px" }} />}
          />
        </Box>
      </Box>
      {/* ROW 2 */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mt="40px">
        <RegionHeader title="Infrastructure" subtitle="View All (4)"/>
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
            title="ServiceNow CMDB"
            content="Various application & infrastructure related API routes."
            icon={<Inventory2OutlinedIcon sx={{ fontSize: "40px" }} />}
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
            title="Unix platform metrics"
            content="Prometheus API for Unix platform data."
            icon={<LanOutlinedIcon sx={{ fontSize: "40px" }} />}
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
            title="Block Storage API"
            content="Storage status & utilisation."
            icon={<StorageOutlinedIcon sx={{ fontSize: "40px" }} />}
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
            title="Database Compliance API"
            content="Reports compliance across the DB estate. "
            icon={<VerifiedUserOutlinedIcon sx={{ fontSize: "40px" }} />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default APILibrary;