"use client";

import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  Stack,
  Menu,
  MenuItem,
  InputBase,
} from "@mui/material";
import { usePathname } from "next/navigation";
import ConfirmationDialog from "@/app/components/ConfirmationDialog";
import { useRouter } from "next/navigation";

import EditIcon from "@mui/icons-material/Edit";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import RefreshIcon from "@mui/icons-material/Refresh";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Avatar from "@mui/material/Avatar";

import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import Image from "next/image";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StoreIcon from "@mui/icons-material/Store";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import GroupsIcon from "@mui/icons-material/Groups";

const sidebarItems = [
  { label: "Stores", icon: <StoreIcon fontSize="small" /> },
  { label: "Account", icon: <AccountCircleIcon fontSize="small" /> },
  { label: "Corporate", icon: <BusinessCenterIcon fontSize="small" /> },
  { label: "Social", icon: <GroupsIcon fontSize="small" /> },
];

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const barColors = [
  "#2D9CDB",
  "#56CCF2",
  "#74D3AE",
  "#FABE7C",
  "#E05A47",
  "#A569BD",
];

const stores = [
  {
    name: "Gadgets",
    logo: "/gadgetsLogo.png",
    desc: "Your one-stop destination for the latest and coolest tech gadgets in Oman.",
    visits: 243000,
  },
  {
    name: "Max Fashion",
    logo: "/maxLogo.png",
    desc: "Middle East’s largest value fashion brand, offering affordable and stylish apparel.",
    visits: 187000,
  },
  {
    name: "V Perfumes",
    logo: "/vperfumesLogo.png",
    desc: "V Perfumes is a leading fragrance retailer in the region, offering an exotic range of scents.",
    visits: 204000,
  },
  {
    name: "Lulu",
    logo: "/luluLogo.png",
    desc: "LuLu Hypermarket is a prominent retail chain in Oman, operated by LuLu Group International.",
    visits: 152000,
  },
  {
    name: "Dunkin",
    logo: "/dunkinLogo.png",
    desc: "Leading American multinational coffee and doughnut company and quick-service restaurant.",
    visits: 98000,
  },
  {
    name: "Arabian Oud",
    logo: "/arabianOudLogo.png",
    desc: "Arabian Oud is a globally renowned fragrance house specializing in oriental scents.",
    visits: 243000,
  },
  {
    name: "Arabian Oud",
    logo: "/arabianOudLogo.png",
    desc: "Arabian Oud is a globally renowned fragrance house specializing in oriental scents.",
    visits: 243580,
  },
];

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const storeChunks = chunkArray(stores, 6);

export default function CmsDashboard() {
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setConfirmOpen(true);
  };

  const confirmLogout = async () => {
    router.push("/");
  };

  const selectedLabel = (() => {
    if (pathname.includes("/account")) return "Account";
    if (pathname.includes("/corporate")) return "Corporate";
    if (pathname.includes("/social")) return "Social";
    return "Stores"; // default
  })();

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = storeChunks.length;

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor="#f0f2f5"
    >
      <Box display="flex" flex={1}>
        {/* Sidebar */}
        <Box
          width={240}
          bgcolor="#fff"
          py={4}
          px={2}
          display="flex"
          flexDirection="column"
          borderRight="1px solid #eee"
        >
          {/* Logo */}
          <Box mb={5} mx="auto">
            <Image
              src="/mallLogo.png"
              alt="Mall Logo"
              width={120}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Menu Items */}
          <Stack spacing={1}>
            {sidebarItems.map((item) => {
              const isSelected = item.label === selectedLabel;

              return (
                <Button
                  key={item.label}
                  fullWidth
                  startIcon={item.icon}
                  disableElevation
                  disableRipple
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#333",
                    borderRadius: "10px",
                    backgroundColor: isSelected ? "#EBEBEC" : "transparent",
                    "&:hover": {
                      backgroundColor: "#f3f3f3",
                    },
                    px: 2,
                    py: 1.2,
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Stack>
        </Box>

        {/* Main Content */}
        <Box flex={1} px={{ xs: 2, md: 6 }} py={2} width="100%">
          {/* Header */}
          <Box mb={4}>
            <Stack
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              {/* Right Column */}
              <Stack spacing={1} alignItems="flex-end">
                {/* Top: Avatar + Name */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <Avatar
                      alt="Mr. Aneesh"
                      src="/avatar.png"
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>

                  <Typography
                    variant="body2"
                    fontWeight={500}
                    sx={{ fontSize: 14 }}
                  >
                    Mr. Aneesh{" "}
                    <span style={{ color: "#E74C3C", fontWeight: 400 }}>
                      (Admin)
                    </span>
                  </Typography>

                  {/* Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Stack>

                {/* Bottom: Search + Icons */}
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Search pill */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 1,
                      borderRadius: "20px",
                      backgroundColor: "#F7F7F7",
                      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05)",
                      minWidth: 200,
                    }}
                  >
                    <SearchIcon fontSize="small" sx={{ color: "#999" }} />
                    <InputBase
                      placeholder="Search"
                      sx={{
                        fontSize: 11,
                        color: "#333",
                        width: "100%",
                      }}
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Box>

                  {/* Icons */}
                  <IconButton size="small">
                    <Brightness4Icon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <NotificationsNoneIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Stack>
          </Box>

          {/* Store Card Carousel */}
          <Box>
            <Grid container spacing={8}>
              {storeChunks[currentPage].map((store, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={idx}
                  sx={{ display: "flex" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      background:
                        "linear-gradient(135deg, #2D9CDB 0%, #56CCF2 100%)",
                      borderRadius: "20px",
                      p: 4,
                      color: "#fff",
                      boxShadow: 3,
                      transition: "transform 0.2s ease",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      minHeight: 170,
                      "&:hover": {
                        transform: "translateY(-3px)",
                      },
                    }}
                  >
                    {/* Store Logo */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -30,
                        left: 20,
                        bgcolor: "#fff",
                        borderRadius: "16px",
                        boxShadow: 3,
                        width: 80,
                        height: 80,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={store.logo}
                        alt={store.name}
                        fill
                        style={{
                          objectFit: "cover",
                          borderRadius: "16px",
                        }}
                      />
                    </Box>

                    {/* Store Name */}
                    <Box
                      sx={{
                        display: "inline-block",
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        px: 2,
                        py: 0.5,
                        ml: 10,
                        borderRadius: "10px",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {store.name}
                      </Typography>
                    </Box>

                    {/* Store Description */}
                    <Typography variant="body2" sx={{ pr: 5 }}>
                      {store.desc.length > 120
                        ? store.desc.substring(0, 117) + "..."
                        : store.desc}
                    </Typography>

                    {/* Edit Button */}
                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 12,
                        right: 12,
                        bgcolor: "#fff",
                        borderRadius: "10px",
                        "&:hover": {
                          bgcolor: "#e0e0e0",
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box mt={4} textAlign="center">
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Swipe or use arrows to view more stores
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton onClick={handlePrev} disabled={currentPage === 0}>
                    <ArrowBackIosNewIcon fontSize="small" />
                  </IconButton>

                  <Stack direction="row" spacing={1}>
                    {storeChunks.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor:
                            index === currentPage ? "#2D9CDB" : "#ccc",
                        }}
                      />
                    ))}
                  </Stack>

                  <IconButton
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Box>
            )}
          </Box>

          {/* Analytics and Campaigns Section */}
          <Grid container spacing={4} mt={4}>
            {/* Store Analytics */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "#fff",
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Store Analytics
                </Typography>

                {/* Recharts Bar Chart */}
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={stores}
                    margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tickFormatter={(name) =>
                        name.length > 6 ? name.slice(0, 5) + "…" : name
                      }
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickFormatter={(val) => `${Math.round(val / 1000)}K`}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => `${value.toLocaleString()} visits`}
                      labelFormatter={(label) => `Store: ${label}`}
                    />
                    <Bar dataKey="visits" radius={[4, 4, 0, 0]}>
                      {stores.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={barColors[index % barColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Grid>

            {/* Marketing Campaigns */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  bgcolor: "#fff",
                  borderRadius: 3,
                  boxShadow: 2,
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  Marketing Campaigns
                </Typography>

                <Box height={200}>
                  {[
                    {
                      title: "Lulu app promotion",
                      date: "May 30, 2025",
                      status: "In Progress",
                    },
                    {
                      title: "Eid Al Adha Discounts",
                      date: "June 5, 2025",
                      status: "Pending",
                    },
                    {
                      title: "Max 25% OFF sale",
                      date: "May 26, 2025",
                      status: "Complete",
                    },
                  ].map((campaign, idx) => (
                    <Stack
                      key={idx}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      py={1}
                      px={2}
                      mb={1}
                      borderRadius={2}
                      bgcolor={
                        campaign.status === "In Progress"
                          ? "#F3F4FF"
                          : campaign.status === "Pending"
                          ? "#F5FFF3"
                          : "#F0F9FF"
                      }
                    >
                      <Typography variant="body2">{campaign.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {campaign.date}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight="bold"
                        sx={{
                          color:
                            campaign.status === "Complete"
                              ? "#27ae60"
                              : campaign.status === "Pending"
                              ? "#e67e22"
                              : "#2D9CDB",
                        }}
                      >
                        {campaign.status}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box component="footer" py={2} px={4} mt="auto" bgcolor="#fff">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          {/* Left: Company Name */}
          <Typography variant="caption" color="text.secondary">
            © 2025 WhiteWall Digital Solutions
          </Typography>

          {/* Right: Footer Links */}
          <Stack direction="row" spacing={2} alignItems="center">
            <a href="#" style={{ textDecoration: "none" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ "&:hover": { color: "#2D9CDB" } }}
              >
                About
              </Typography>
            </a>
            <a href="#" style={{ textDecoration: "none" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ "&:hover": { color: "#2D9CDB" } }}
              >
                Support
              </Typography>
            </a>
            <a href="#" style={{ textDecoration: "none" }}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ "&:hover": { color: "#2D9CDB" } }}
              >
                Contact Us
              </Typography>
            </a>
          </Stack>
        </Stack>
      </Box>
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out from the CMS?"
        confirmButtonText="Logout"
      />
    </Box>
  );
}
