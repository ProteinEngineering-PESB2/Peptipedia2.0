import { useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";

import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

// Components
import ListItems from "../../components/Dashboard/ListItems";
import RenderSection from "../../components/Dashboard/RenderSection";

import { AppBar, DrawerHeader, Main } from "../../components/Dashboard/utils";

const mdTheme = createTheme();
const drawerWidth = 240;

const Dashboard = () => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setOpen(true)}
              sx={{
                mr: 2,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            {/* <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography> */}
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={() => setOpen(false)}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <ListItems setSection={setSection} />
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <RenderSection section={section} />
          </Container>
        </Main>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
