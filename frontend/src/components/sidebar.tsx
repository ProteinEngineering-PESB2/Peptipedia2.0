import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

import { Home, Storage } from "@mui/icons-material";

export default function Sidebar() {
  const [section, setSection] = useState("home");
  const navigate = useNavigate()

  return (
    <List component="nav">
      <ListSubheader>Dashboard</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "home" ? "#2962ff" : "#fff",
            color: section === "home" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/")}
        >
          <Home sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{ fontWeight: section === "home" ? "bold" : "normal" }}
            >
              Home
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
      <ListSubheader>Database</ListSubheader>
      <List component="div" disablePadding>
        <ListItemButton
          disableRipple
          sx={{
            pl: 2,
            margin: "6px 14px",
            padding: "9px",
            borderRadius: "8px",
            backgroundColor: section === "database" ? "#2962ff" : "#fff",
            color: section === "database" ? "#fff" : "#000",
            "&:hover": {
              background: "#2962ff",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/database")}
        >
          <Storage sx={{ marginLeft: -0.2 }} />
          <ListItemText sx={{ marginLeft: 3 }}>
            <Typography
              sx={{ fontWeight: section === "database" ? "bold" : "normal" }}
            >
              Database
            </Typography>
          </ListItemText>
        </ListItemButton>
      </List>
    </List>
  );
}
