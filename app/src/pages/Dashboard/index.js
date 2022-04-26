import "./index.css";

import { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

// Components
import ListItems from "../../components/Dashboard/ListItems";
import RenderSection from "../../components/Dashboard/RenderSection";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("home");

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          paddingY: 2,
          backgroundColor: "#EEEEEE",
        }}
      >
        <Container maxWidth="xl">
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={() => setOpen(!open)}
            size="large"
            sx={{
              mr: 2,
              color: "#000"
            }}
          >
            <FormatAlignJustifyIcon />
          </IconButton>
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
