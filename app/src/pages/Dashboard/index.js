import "./index.css";

import React, { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";

// Components
import ListItems from "../../components/Dashboard/ListItems";
import RenderSection from "../../components/Dashboard/RenderSection";
import { AppBar, Toolbar } from "@mui/material";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Dashboard = (props) => {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("home");

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          backgroundColor: "#EEEEEE",
        }}
      >
        <CssBaseline />
        <ElevationScroll {...props}>
          <AppBar
            position="fixed"
            sx={{ backgroundColor: "#EEEEEE", padding: 0.5 }}
          >
            <Toolbar>
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
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Container maxWidth="xl" sx={{ paddingY: 8 }}>
          <RenderSection section={section} />
        </Container>
      </Box>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <ListItems setSection={setSection} section={section} />
        </Box>
      </Drawer>
    </>
  );
};

export default Dashboard;
