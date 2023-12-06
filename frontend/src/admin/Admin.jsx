import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { AccountCircle, Dashboard } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CreateProductForm from "./components/CreateProductForm";
import ProductTable from "./components/ProductTable";
import OrderTable from "./components/OrderTable";
import CustomerTable from "./components/CustomerTable";
import AdminDashboard from "./components/AdminDashboard";

const drawerWidth = 240;

const menu = [
  { name: "Dashboard", path: "/admin", icon: <GridViewIcon /> },
  { name: "Products", path: "/admin/products", icon: <ListAltIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <PeopleAltIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingBagIcon /> },
  {
    name: "Add Product",
    path: "/admin/product/create",
    icon: <PlaylistAddIcon />,
  },
  // {name:"", path:"/admin", icon:},
];

const Admin = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* <Toolbar /> */}
      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // const drawerVariant

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {/* <Toolbar /> */}
        <Typography paragraph>
        <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/product/create" element={<CreateProductForm />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/orders" element={<OrderTable />} />
        <Route path="/customers" element={<CustomerTable />} />
      </Routes>
        </Typography>
      </Box>
    </Box>
    </div>
  );
};

export default Admin;
