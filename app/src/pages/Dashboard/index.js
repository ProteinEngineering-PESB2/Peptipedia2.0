import "./index.css";

import { useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { useTheme } from "@mui/material/styles";

// Components
import ListItems from "../../components/Dashboard/ListItems";
import RenderSection from "../../components/Dashboard/RenderSection";

import { Main, DrawerHeader } from "../../components/Dashboard/utils";

const TestDashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [section, setSection] = useState("home");
  const drawerWidth = 255;

  return (
    <>
      <Box sx={{ diplay: "flex" }}>
        <CssBaseline />
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
          <ListItems setSection={setSection} section={section} />
        </Drawer>
        <Main open={true}>
          <Container maxWidth="lg">
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={() => setOpen(!open)}
              size="large"
              sx={{
                mr: 2,
                color: "#000",
                position: "absolute",
                marginTop: -4,
                ...(open && { display: "none" }),
              }}
            >
              <FormatAlignLeftIcon />
            </IconButton>
            <RenderSection section={section} />
          </Container>
        </Main>
      </Box>
    </>
  );
};

export default TestDashboard;
