import "./index.css";

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
import SearchIcon from "@mui/icons-material/Search";

import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

// Components
import ListItems from "../../components/Dashboard/ListItems";
import RenderSection from "../../components/Dashboard/RenderSection";

import {
  AppBar,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  DrawerHeader,
  Main,
} from "../../components/Dashboard/utils";

const TestDashboard = () => {
  const mdTheme = createTheme();
  const [open, setOpen] = useState(true);
  const [section, setSection] = useState("home");
  const theme = useTheme();
  const drawerWidth = 240;

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box className="display">
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
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, fontWeight: 'bold' }}
              >
                Peptipedia
              </Typography>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
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
            <ListItems setSection={setSection} section={section}/>
          </Drawer>
          <Main open={true}>
            <DrawerHeader />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <RenderSection section={section} />
            </Container>
          </Main>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default TestDashboard;
