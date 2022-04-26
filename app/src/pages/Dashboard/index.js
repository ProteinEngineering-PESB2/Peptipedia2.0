import "./index.css";

import { useState } from "react";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

// Components
import ListItems from "../../components/Dashboard/ListItems";
import RenderSection from "../../components/Dashboard/RenderSection";

import { Main, drawerWidth } from "../../components/Dashboard/utils";

const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const [section, setSection] = useState("home");

  return (
    <Box sx={{ display: "flex" }}>
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
        <ListItems setSection={setSection} section={section} />
      </Drawer>
      <Main open={open}>
        <Container maxWidth="false">
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpen(!open)}
            size="large"
            sx={{
              mr: 2,
              color: "#000",
            }}
          >
            <FormatAlignJustifyIcon />
          </IconButton>
          <RenderSection section={section} />
        </Container>
      </Main>
    </Box>
  );
};

export default Dashboard;
