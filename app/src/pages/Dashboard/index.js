import "./index.css";

import { useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";

import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";

// Components
import ListItems from "../../components/Dashboard/ListItems";
import RenderSection from "../../components/Dashboard/RenderSection";

import { AppBar, DrawerHeader, Main } from "../../components/Dashboard/utils";

const TestDashboard = () => {
  const mdTheme = createTheme();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("");
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
          <Main open={true}>
            <DrawerHeader />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <RenderSection section={section} />
              {/* <Grid container spacing={5}>
                <Grid item lg={12} xs={12}>
                  <Grid container spacing={3}>
                    <Grid item lg={7} xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div className="wrapper">
                          <div id="blast-multiple-alignments"></div>
                        </div>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div className="table-responsive">
                          <div id="blast-alignments-table"></div>
                        </div>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div id="blast-single-alignment"></div>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
            </Container>
          </Main>
        </Box>
      </ThemeProvider>
      {/* <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="wrapper border border-primary">
                  <div id="blast-multiple-alignments"></div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <div className="table-responsive">
                <div id="blast-alignments-table"></div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="border border-danger">
                <div id="blast-single-alignment"></div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </>
  );
};

export default TestDashboard;
